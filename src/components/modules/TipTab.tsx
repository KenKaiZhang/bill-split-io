import { UserIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Dialog, DialogContent } from "../ui/dialog"
import { DialogClose, DialogDescription, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog"
import { useEffect, useState } from "react"

interface TipTabProps {
    billTotal?: number,
    tip?: number,
    heads?: number,
    setBillTotal: (value: number | undefined) => void,
    setTip: (value: number | undefined) => void,
    setHeads: (value: number | undefined) => void
}

const TipTab: React.FC<TipTabProps> = ({
    billTotal,
    tip,
    heads,
    setBillTotal,
    setTip,
    setHeads
}) => {

    const [selectedTip, setSelectedTip] = useState<number | undefined>()
    const [customTip, setCustomTip] = useState<number | undefined>()
    
    useEffect(() => {
        if (selectedTip) {
            const newTip = (billTotal || 0) * ((selectedTip || 0) / 100) 
            setTip(newTip)
        } else if (customTip) {
            console.log("hee")
            setTip(customTip)
        } else {
            setTip(0)
        }
    }, [billTotal, customTip, selectedTip, setTip])

    const handleSelectTip = (value: number) => {
        if (value === selectedTip)
            setSelectedTip(undefined)
        else {
            setCustomTip(undefined)
            setSelectedTip(value)
        }
    }

    const handleReset = () => {
        setBillTotal(0)
        setTip(0)
        setHeads(1)
        setCustomTip(undefined)
        setSelectedTip(undefined)
    }

    return (
        <div className="mb-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <Label htmlFor="bill-total">Bill</Label>
                <div className="relative">
                    <p className="absolute top-2 left-2 text-cyan-800">$</p>
                    <Input 
                        id="bill-total" 
                        value={billTotal}
                        onChange={(e) => setBillTotal(parseFloat(e.target.value))}
                        type="number" 
                        step="0.01"
                        className="text-right bg-cyan-50 text-cyan-800 font-bold"
                        placeholder="0.00"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="tip-selector">Select Tip %</Label>
                <div id="tip-selector" className="flex flex-wrap gap-2">
                    {[5, 10, 15, 20, 25].map((tipAmmount) => (
                        <Button 
                            key={tipAmmount}
                            className={`flex-grow basis-1/4 h-[60px] ${selectedTip === tipAmmount ? "bg-cyan-500" : "bg-cyan-800"}`}
                            onClick={() => handleSelectTip(tipAmmount)}
                        >
                            {`${tipAmmount}%`}
                        </Button>
                    ))}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className={`flex-grow basis-1/4 h-[60px] ${customTip ? "bg-cyan-500" : "bg-cyan-800"}`}>Custom</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>Custom Tip Amount</DialogTitle>
                            <DialogDescription>
                                <Input 
                                    id="custom-tip" 
                                    type="number"
                                    value={customTip}
                                    onChange={(e) => setCustomTip(parseFloat(e.target.value))}
                                    className="text-right bg-cyan-50 text-cyan-800 font-bold"
                                    placeholder="0.00"
                                />
                            </DialogDescription>
                            <DialogClose asChild>
                                <div className="ml-auto flex gap-2">
                                    <Button className="bg-red-500">Cancel</Button>
                                    <Button 
                                        className="bg-cyan-800"
                                        onClick={() => setSelectedTip(undefined)}
                                    >Set Custom</Button>
                                </div>
                            </DialogClose>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="head-count">Number of People</Label>
                <div className="relative">
                    <UserIcon 
                        className="absolute top-2 left-2 text-cyan-800" 
                    />
                    <Input 
                        id="head-count" 
                        type="number" 
                        className="text-right bg-cyan-50 text-cyan-800 font-bold"
                        value={heads}
                        onChange={(e) => setHeads(parseFloat(e.target.value))}
                        placeholder="1"
                    />
                </div>
            </div>
            <div className="p-4 w-full flex flex-col gap-2 bg-cyan-800 rounded-md">
                <div className="flex justify-between">
                    <b className="text-white">Tip</b>
                    <b className="text-cyan-300">{`$${(tip || 0).toFixed(2)}`}</b>
                </div>
                <div className="flex justify-between">
                    <b className="text-white">Total</b>
                    <b className="text-cyan-300">{`$${((billTotal || 0) + (tip || 0)).toFixed(2)}`}</b>
                </div>
                <div className="flex justify-between">
                    <b className="text-white">Total / Person</b>
                    <b className="text-cyan-300">{`$${(((billTotal || 0) + (tip || 0) )/ (heads || 1)).toFixed(2)}`}</b>
                </div>
                <Button className="mt-8 bg-cyan-600" onClick={handleReset}>Reset</Button>
            </div>
        </div>
    )
}

export default TipTab
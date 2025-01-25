import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Dialog, DialogContent } from "../ui/dialog"
import { DialogClose, DialogDescription, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog"
import { useEffect, useState } from "react"

interface TipTabProps {
    bill?: number,
    tax?: number,
    tip?: number,
    setBill: (value: number | undefined) => void,
    setTip: (value: number | undefined) => void,
    setTax: (value: number | undefined) => void
}

const TipTab: React.FC<TipTabProps> = ({
    bill,
    tax,
    tip,
    setBill,
    setTip,
    setTax
}) => {

    const [selectedTip, setSelectedTip] = useState<number | undefined>()
    const [customTip, setCustomTip] = useState<number | undefined>()
    
    useEffect(() => {
        if (selectedTip) {
            const newTip = (bill || 0) * ((selectedTip || 0) / 100) 
            setTip(newTip)
        } else if (customTip) {
            setTip(customTip)
        } else {
            if (!tip)
                setTip(0)
        }
    }, [bill, customTip, selectedTip, setTip, tip])

    const handleSelectTip = (value: number) => {
        if (value === selectedTip)
            setSelectedTip(undefined)
        else {
            setCustomTip(undefined)
            setSelectedTip(value)
        }
    }

    const handleReset = () => {
        setBill(undefined)
        setTip(undefined)
        setTax(undefined)
        setCustomTip(undefined)
        setSelectedTip(undefined)
    }

    return (
        <div className="mb-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <Label htmlFor="bill">Bill</Label>
                <div className="relative">
                    <p className="absolute top-2 left-2 text-cyan-800">$</p>
                    <Input 
                        id="bill" 
                        value={bill ?? ""}
                        onChange={(e) => setBill(parseFloat(e.target.value))}
                        type="number" 
                        step="0.01"
                        className="text-right bg-cyan-50 text-cyan-800 font-bold"
                        placeholder="0.00"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="bill-total">Tax</Label>
                <div className="relative">
                    <p className="absolute top-2 left-2 text-cyan-800">$</p>
                    <Input 
                        id="tax" 
                        value={tax ?? ""}
                        onChange={(e) => setTax(parseFloat(e.target.value))}
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
                            className={`flex-grow basis-1/4 h-[60px] ${selectedTip === tipAmmount ? "bg-cyan-500" : "bg-cyan-800"} hover:bg-cyan-600`}
                            onClick={() => handleSelectTip(tipAmmount)}
                        >
                            {`${tipAmmount}%`}
                        </Button>
                    ))}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className={`flex-grow basis-1/4 h-[60px] ${customTip ? "bg-cyan-500" : "bg-cyan-800"} hover:bg-cyan-600`}>Custom</Button>
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
                                    <Button className="bg-red-500 hover:bg-red-400">Cancel</Button>
                                    <Button 
                                        className="bg-cyan-800 hover:bg-cyan-700"
                                        onClick={() => setSelectedTip(undefined)}
                                    >Set Custom</Button>
                                </div>
                            </DialogClose>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className="p-4 w-full flex flex-col gap-2 bg-cyan-800 rounded-md">
                <div className="flex justify-between">
                    <b className="text-white">Tip</b>
                    <b className="text-cyan-300">{`$${(tip || 0).toFixed(2)}`}</b>
                </div>
                <div className="flex justify-between">
                    <b className="text-white">Total</b>
                    <b className="text-cyan-300">{`$${((bill || 0) + (tax || 0) + (tip || 0)).toFixed(2)}`}</b>
                </div>
                <Button className="mt-8 bg-cyan-600 hover:bg-cyan-500" onClick={handleReset}>Reset</Button>
            </div>
        </div>
    )
}

export default TipTab
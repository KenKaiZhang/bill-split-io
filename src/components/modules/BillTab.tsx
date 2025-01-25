import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useMemo, useState } from "react"

interface BillTabProps {
   bill?: number,
   tip?: number, 
   tax?: number
}

interface ItemProps {
    name?: string,
    cost?: number,
}

const BillTab: React.FC<BillTabProps> = ({
    bill,
    tip,
    tax,
}) => {

    const [itemsOrdered, setItemsOrdered] = useState<ItemProps[]>([]);

    const itemsTotal = useMemo(
        () =>
            itemsOrdered.reduce((total, item) => total + (parseFloat(item.cost as any) || 0), 0),
        [itemsOrdered]
    );

    const portion = useMemo(() => bill ? itemsTotal / bill : 0, [bill, itemsTotal])
    const taxShare = useMemo(() => (tax || 0) * portion, [portion, tax])
    const tipShare = useMemo(() => (tip || 0) * portion, [portion, tip])
    
    const handleAddItem = () => {
        setItemsOrdered((prev) => ([
            ...prev,
            { name: "", cost: undefined }
        ]))
    }

    const handleDeleteItem = (index: number) => {
        setItemsOrdered((prev) => prev.filter((_, i) => i !== index))
    }

    const handleUpdateItem = (index: number, key: keyof ItemProps, value: string | number) => {
        setItemsOrdered((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, [key]: value } : item
            )
        );
    };
    
    const handleReset = () => {
        setItemsOrdered([])
    }

    return (
        <div className="mb-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                    <p>Bill:</p>
                    <p className="font-bold text-cyan-800">{`$${(bill || 0).toFixed(2)}`}</p>
                </div>
                <div className="flex justify-between">
                    <p>Tax:</p>
                    <p className="font-bold text-cyan-800">{`$${(tax || 0).toFixed(2)}`}</p>
                </div>
                <div className="flex justify-between">
                    <p>Tip:</p>
                    <p className="font-bold text-cyan-800">{`$${(tip || 0).toFixed(2)}`}</p>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="items-ordered">Items Ordered</Label>
                <div id="items-ordered" className="flex flex-col gap-2">
                    {itemsOrdered.map(({ name, cost }, i) => (
                        <div key={i} className="flex gap-2">
                            <Input
                                value={name}
                                onChange={(e) => handleUpdateItem(i, "name", e.target.value)}
                                placeholder={`New Item ${i + 1}`}
                            />
                            <Input 
                                value={cost}
                                className="w-[100px]"
                                onChange={(e) => handleUpdateItem(i, "cost", e.target.value)}
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                            />
                            <Button 
                                className="aspect-square bg-red-500 hover:bg-red-400"
                                onClick={() => handleDeleteItem(i)}
                            >
                                X
                            </Button>
                        </div>
                    ))}
                    <Button 
                        className="bg-cyan-800 hover:bg-cyan-900"
                        onClick={handleAddItem}
                    >
                        Add Item
                    </Button>
                </div>
            </div>
            <div className="p-4 w-full flex flex-col gap-2 bg-cyan-800 rounded-md">
                {   itemsTotal > (bill || 0)
                    ? (
                        <div className="flex flex-col gap-2 justify-center items-center text-center text-white">
                            <p className="font-bold">Error!</p>
                            <span>
                                <p className="text-sm">Total cost of items</p>
                                <p className="text-sm">exceeds given bill total by</p>
                                <p className="font-bold">{`$${itemsTotal - (bill || 0)}`}</p>
                            </span>
                        </div>
                    )
                    : (
                        <>
                            <div className="flex justify-between text-sm">
                                <b className="text-white">Tax Share</b>
                                <b className="text-cyan-300">{`$${taxShare.toFixed(2)}`}</b>
                            </div>
                            <div className="flex justify-between text-sm">
                                <b className="text-white">Tip Share</b>
                                <b className="text-cyan-300">{`$${tipShare.toFixed(2)}`}</b>
                            </div>
                            <div className="flex justify-between text-sm">
                                <b className="text-white">Order Amount</b>
                                <b className="text-cyan-300">{`$${itemsTotal.toFixed(2)}`}</b>
                            </div>
                            <div className="my-2 h-[1px] w-full bg-gray-300" />
                            <div className="flex justify-between">
                                <b className="text-white">Amount Owed</b>
                                <b className="text-cyan-300">{`$${(itemsTotal + taxShare + tipShare).toFixed(2)}`}</b>
                            </div>
                        </>
                    )

                }
                <Button className="mt-8 bg-cyan-600 hover:bg-cyan-500" onClick={handleReset}>Reset</Button>
            </div>
        </div>
    )
}

export default BillTab
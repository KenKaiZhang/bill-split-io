
import { TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Tabs } from './components/ui/tabs';
import { useState } from 'react';
import { captialize } from './lib/utils';
import BillTab from './components/modules/BillTab';
import TipTab from './components/modules/TipTab';

function App() {

  const [activeTab, setActiveTab] = useState("tip")
  const [bill, setBill] = useState<number | undefined>()
  const [tax, setTax] = useState<number | undefined>()
  const [tip, setTip] = useState<number | undefined>()

  const handleBillChange = (value: number | undefined) => {
    setBill(value)
  } 
  const handleTipChange = (value: number | undefined) => {
    setTip(value)
  } 
  const handleTaxChange = (value: number | undefined) => {
    setTax(value)
  } 

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-cyan-100">
      <div className="my-8 text-cyan-800 font-bold">
        <div className="flex gap-4">
          {"BILL".split("").map((char, i) => (
            <p key={i}>{char}</p>
          ))}
        </div>
        <div className="flex gap-4">
          {"SPLI".split("").map((char, i) => (
            <p key={i}>{char}</p>
          ))}
        </div>
        <div className="flex gap-4">
          {"TTER".split("").map((char, i) => (
            <p key={i}>{char}</p>
          ))}
        </div>
      </div>
      <Tabs 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-[90%] max-w-[500px] aspect-[2/3]"
      >
        <TabsList>
          {["tip", "bill"].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="w-[50%] h-[45px] rounded-t-lg duration-300"
              style={{ background: activeTab === tab ? "white" : "transparent"}}
            >
              <b>{captialize(tab)}</b>
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent 
          value="tip"
          className="px-8 py-4 bg-white rounded-b-lg rounded-tr-lg"
        >
          <TipTab 
            bill={bill}
            tip={tip}
            tax={tax}
            setBill={handleBillChange}
            setTip={handleTipChange}
            setTax={handleTaxChange}
          />
        </TabsContent>
        <TabsContent 
          value="bill"
          className="px-8 py-4 bg-white rounded-b-lg rounded-tl-lg"
        >
          <BillTab 
            bill={bill}
            tip={tip}
            tax={tax}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;

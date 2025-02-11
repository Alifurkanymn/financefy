import Image from "next/image";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CoinsIcon, Goal, HandCoins, Landmark, Wallet } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


export default function Home() {
  const data = [
    { type: "Gelir", name: "Maaş", amount: "10.000 TL" },
    { type: "Gelir", name: "Freelance", amount: "5.000 TL" },
    { type: "Gelir", name: "Yatırım", amount: "3.000 TL" },
    { type: "Gelir", name: "Ek İş", amount: "2.000 TL" },
    { type: "Gelir", name: "Ek İş", amount: "2.000 TL" },
    { type: "Gelir", name: "Ek İş", amount: "2.000 TL" },
    { type: "Gelir", name: "Ek İş", amount: "2.000 TL" },
    { type: "Gelir", name: "Ek İş", amount: "2.000 TL" },
    { type: "Gelir", name: "Ek İş", amount: "2.000 TL" },
    { type: "Gelir", name: "Ek İş", amount: "2.000 TL" },
    { type: "Gelir", name: "Ek İş", amount: "2.000 TL" },
  ];
  return (
    <div className="flex flex-col w-full gap-6">

      {/* Hızlı İşlemler */}

      <div className="quick-transactions">
        <h1 className="text-2xl text-black font-bold mb-3">Hızlı İşlemler</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="w-full relative hover:scale-105 transition-all duration-300">
            <CardHeader className="flex flex-row gap-4">
              <HandCoins className="text-green-500" size={48} />
              <div className="!mt-0">
                <CardTitle className="text-xl">Gelir Ekle</CardTitle>
                <CardDescription>Yeni bir gelir kaydı oluşturun.</CardDescription>
                <a href="" className=" inset-0 absolute" />
              </div>
            </CardHeader>
          </Card>

          <Card className="w-full relative hover:scale-105 transition-all duration-300">
            <CardHeader className="flex flex-row gap-4">
              <Landmark className="text-teal-500" size={48} />
              <div className="!mt-0">
                <CardTitle className="text-xl">Gider Ekle</CardTitle>
                <CardDescription>Yeni bir gider ekleyin ve harcamalarınızı takip edin.</CardDescription>
                <a href="" className=" inset-0 absolute" />
              </div>
            </CardHeader>
          </Card>

          <Card className="w-full relative hover:scale-105 transition-all duration-300">
            <CardHeader className="flex flex-row gap-4">
              <Goal className="text-purple-500" size={48} />
              <div className="!mt-0">
                <CardTitle className="text-xl">Hedef Ekle</CardTitle>
                <CardDescription>Finansal hedeflerinizi belirleyin ve takip edin.</CardDescription>
                <a href="" className=" inset-0 absolute" />
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
      <hr />

      {/* Tablo Özetleri */}

      <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4">
        {["Gelirlerim", "Giderlerim", "Hedeflerim"].map((title, index) => (
          <Card key={index} className="h-full w-full relative">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Adı</TableHead>
                    <TableHead className="text-right">Tutar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item, i) => (
                    <TableRow key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell className="text-right">{item.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Varlıklarım */}

      <div className="total w-full flex flex-col items-end">
        <Card className="bg-green-600 w-max">
          <CardHeader className="flex flex-row items-center gap-4">
            <Wallet className="text-white" size={48} />
            <div className="!mt-0">
              <CardTitle className="text-xl text-white">10.000 TL</CardTitle>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div >
  );
}

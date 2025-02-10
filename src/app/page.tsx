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

export default function Home() {
  return (
    <div className="flex flex-col w-full p-6">
      <div className="fast">
        <h1 className="text-2xl text-black font-bold mb-3">Hızlı İşlemler</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Gelir Ekle</CardTitle>
              <CardDescription>Yeni bir gelir kaydı oluşturun.</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="btn primary-btn !w-auto" onClick={null}>Gelir Sayfasına Git</Button>
            </CardFooter>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Gider Ekle</CardTitle>
              <CardDescription>Yeni bir gider ekleyin ve harcamalarınızı takip edin.</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="btn primary-btn !w-auto" onClick={null}>Gider Sayfasına Git</Button>
            </CardFooter>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Hedef Ekle</CardTitle>
              <CardDescription>Finansal hedeflerinizi belirleyin ve takip edin.</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="btn primary-btn !w-auto" onClick={null}>Hedefler Sayfasına Git</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

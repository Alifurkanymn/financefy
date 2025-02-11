import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Props = {}

const Summary = (props: Props) => {
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
        <div>
            <h1 className="text-2xl text-black font-bold mb-3">Özetler</h1>
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
        </div>
    )
}

export default Summary
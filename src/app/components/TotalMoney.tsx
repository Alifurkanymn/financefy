import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CoinsIcon, EqualApproximately, Goal, HandCoins, Landmark, Wallet } from "lucide-react";


const TotalMoney = ({ netTotal }) => {
    return (
        <div className="total w-full flex flex-col items-end">
            <Card className="bg-green-600 w-max">
                <CardHeader className="flex flex-row items-center gap-4">
                    <Wallet className="text-white" size={48} />
                    <div className="!mt-0">
                        <CardTitle className="text-xl text-white">{netTotal} TL</CardTitle>
                    </div>
                </CardHeader>
            </Card>
        </div>
    )
}

export default TotalMoney
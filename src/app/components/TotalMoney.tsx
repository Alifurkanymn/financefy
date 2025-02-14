import React from 'react';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet } from "lucide-react";

interface TotalMoneyProps {
    netTotal: number;
}

const TotalMoney = ({ netTotal }: TotalMoneyProps) => {
    return (
        <div className="total w-full flex flex-col items-end">
            <Card className="bg-green-600 w-max">
                <CardHeader className="flex flex-row items-center gap-4 p-4 lg:p-6">
                    <Wallet className="text-white" size={24} />
                    <div className="!mt-0">
                        <CardTitle className="text-lg lg:text-2xl text-white">{netTotal} TL</CardTitle>
                    </div>
                </CardHeader>
            </Card>
        </div>
    );
};

export default TotalMoney;

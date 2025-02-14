import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

type Props = {}

const TableSkeleton = (props: Props) => {
    return (
        <div className="flex items-center space-x-4 w-full">
            <div className="space-y-2 w-full">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
            </div>
        </div>
    )
}

export default TableSkeleton
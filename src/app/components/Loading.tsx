import { LoaderIcon } from 'lucide-react'
import React from 'react'

type Props = {}

const Loading = (props: Props) => {
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <LoaderIcon className="animate-spin text-primaryColor" size={100} />
        </div>
    )
}

export default Loading
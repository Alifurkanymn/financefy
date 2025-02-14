import { LoaderIcon } from 'lucide-react'
import React from 'react'


const Loading = () => {
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <LoaderIcon className="animate-spin text-primaryColor" size={100} />
        </div>
    )
}

export default Loading
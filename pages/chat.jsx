import React from 'react'
import Chat from '../component/Chat/Chat'
import MainLayout from '../component/Layouts/MainLayout'

const chat = () => {
    return (
        <MainLayout>
            <div className="w-full flex flex-col pl-20 mt-20 ">
                <div className="flex items-center space-x-4 flex">
                    <h1 className="text-2xl text-grey-welcome font-bold flex items-center ">Chat de atención al usuario</h1>
                </div>


                <Chat />
            </div>
        </MainLayout>
    )
}

export default chat
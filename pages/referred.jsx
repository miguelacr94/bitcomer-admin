import React from 'react'
import MainLayout from '../component/Layouts/MainLayout'
import ReferredTable from '../component/Referred/ReferredTable'

const Referred = () => {
    return (
        <MainLayout>
            <div className="w-full flex flex-col pl-20 mt-36 pr-8 ">
                <div className="w-1/6 flex items-center justify-center flex-col">
                    <h1 className="text-2xl text-grey-welcome font-bold ">Usuarios</h1>
                </div>
                <ReferredTable />
            </div>

        </MainLayout>


    )
}

export default Referred

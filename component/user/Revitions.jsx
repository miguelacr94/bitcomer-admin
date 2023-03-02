import React from 'react'

const Revitions = () => {
    return (
        <div className="flex-col lg:flex-row flex w-full justify-center items-start lg:space-x-6 pl-16 lg:pl-0 lg:space-y-0 space-y-4 ">
            <div
                className="w-2/6 h-24 bg-green-500  rounded-3xl py-4 px-6">
                <div className="h-3/6 w-full flex justify-start items-end">
                    <h1 className="text-xl text-white font-bold">Movimientos</h1>
                </div>
                <div className="flex items-start  h-3/6 w-full text-white">
                    <div className="w-4/6 flex items-start">
                        <p className=" left-0 font-normal">Usuarios activos</p>
                    </div>
                    <div className="w-2/6  flex items-start justify-end">
                        <a className="underline w-3/6 right-0 text-sm cursor-pointer">Revisar</a>
                    </div>
                </div>
            </div>


            <div className="w-2/6 h-24 bg-yellow-500 rounded-3xl p-4">
                <div className="h-3/6 w-full flex justify-start items-end">
                    <h1 className="text-xl text-white font-bold">Pendientes</h1>
                </div>
                <div className="flex items-start  h-3/6 w-full text-white">
                    <div className="w-4/6 flex items-start">
                        <p className=" left-0 font-normal">Hay 2 usuarios en espera</p>
                    </div>
                    <div className="w-2/6  flex items-start justify-end">
                        <a className="underline w-3/6 right-0 text-sm cursor-pointer">Revisar</a>
                    </div>
                </div>

            </div>


            <div className="w-2/6 h-24 bg-red-500 rounded-3xl p-4">

                <div className="h-3/6 w-full flex justify-start items-end">
                    <h1 className="text-xl text-white font-bold">Errores</h1>
                </div>
                <div className="flex items-start  h-3/6 w-full text-white">
                    <div className="w-4/6 flex items-start">
                        <p className=" left-0 font-normal">Hay 1 usuario con errores</p>
                    </div>
                    <div className="w-2/6  flex items-start justify-end">
                        <a className="underline w-3/6 right-0 text-sm cursor-pointer">Revisar</a>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default Revitions
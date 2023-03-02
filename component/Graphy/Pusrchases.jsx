import React from 'react'
import { currencyFormat } from '../../utils/helpers'

const Pusrchases = ({ data }) => {
    return (
        <div className="flex justify-center items-center w-full space-x-12 rounded-xl shadow-xl text-black  px-8  h-24 ">
            <div className="w-3/6 flex flex-col justify-start items-start">
                <div className="flex justify-start items-start">
                    <p className="w-1 h-1 bg-red-400 rounded-full mt-1"></p>
                    <p className="ml-1 text-xs">Ventas HOY</p>
                </div>
                <div className="mt-2">
                    <p className="font-bold text-xl">{currencyFormat(data?.purchases)}</p>
                    <p className="w-24 h-2 mt-2 rounded-md bg-red-400"></p>
                </div>
            </div>


            <div className="w-3/6 flex flex-col justify-start items-start">
                <div className="flex justify-start items-start">
                    <p className="w-1 h-1 bg-positive rounded-full mt-1"></p>
                    <p className="ml-1 text-xs">Active Users</p>
                </div>
                <div className="mt-2">
                    <p className="font-bold text-xl">{data?.userCount}</p>
                    <p className="w-16 h-2 rounded-md bg-positive mt-2"></p>
                </div>

            </div>
        </div>
    )
}

export default Pusrchases
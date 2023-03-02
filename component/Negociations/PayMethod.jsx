import React from 'react'
import { Pay } from '../../utils/data'
import { Icons } from '../../utils/icons'

const PayMethod = () => {
    return (
        <div className="mt-4">
            <h2 className="text-start ml-4">¿Como quieres pagar?</h2>

            <div className="p-2  w-full ">
                {
                    Pay.map((pay, index) => {
                        return (
                            <div key={index} className="flex w-full bg-white mt-1 rounded h-8 border border-grey-bInput" >

                                <div className="w-5/6 flex justify-start items-center overflow-hidden px-4">
                                    <img
                                        src={pay.icon}
                                        className="w-16 h-10"
                                    />
                                </div>

                                <p className="w-1/6 flex justify-end items-center px-2 float-right">{Icons.RigthArrow}</p>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default PayMethod
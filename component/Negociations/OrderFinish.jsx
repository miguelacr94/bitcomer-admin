import React from 'react'
import Button from '../Ui/Button'
import PayMethod from './PayMethod'

const OrderFinish = () => {
    return (
        <div className="w-3/6 ml-4 mr-4 border border-grey-bTap rounded-sm pb-12 text-center py-4  px-2">
            <h2 className=" font-semibold">Orden final</h2>
            <hr className="bg-grey-line h-line w-full m-auto mt-4" />
            <div className="w-full px-4 mt-4">
                <div className="flex">
                    <p className="w-5/6 text-start font-light text-sm">Pago:</p>
                    <p className="w-1/6 text-start font-bold">$1000000</p>
                </div>
                <div className="flex">
                    <p className="w-5/6 text-start font-light text-sm">Comisión de servicios:</p>
                    <p className="w-1/6 text-start font-bold">$1002029</p>
                </div>
                <div className="flex ">
                    <p className="w-5/6 text-start font-light text-sm">Total:</p>
                    <p className="w-1/6 text-start font-bold">$800000</p>
                </div>
            </div>

            <hr className="bg-grey-line h-line  w-full m-auto mt-4" />
            <PayMethod />
            <div className="flex justify-end mt-2">
                <Button
                    text='Completar'
                    className="bg-menu text-white px-4"
                />
            </div>
        </div>
    )
}

export default OrderFinish
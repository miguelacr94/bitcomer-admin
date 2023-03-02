import React from 'react'
import { aprobateTransaction } from '../../providers/api/transaction.queries';
import { data } from '../../utils/__data';

const Details = ({ detail, data, onClose, resp }) => {


    const aprobatePurchase = async (status) => {

        const id = detail?.data?._id;
        const qr = 'elpatronsoyyo'
        const payload = {
            status: status,
        }

        const res = await aprobateTransaction(id,qr, payload);
        if (res) {
            // resp(res?.data);
            onClose();
        }

    }





    return (
        <div className="w-96">
            <h1 className="mt-4 text-center">Compra</h1>
            <hr className="h-1 text-grey-line" />
            <div className="mt-4">
                <div className="flex space-x-4">
                    <p className="w-3/6 text-start text-sm font-medium">Moneda:</p>
                    <p className="w-3/6 text-start text-xs font-semibold">{detail?.data?.currency}</p>
                </div>
                <div className="flex space-x-4">
                    <p className="w-3/6 text-start text-sm font-medium">Valor:</p>
                    <p className="w-3/6 text-start text-xs font-semibold">${detail?.data?.value.toFixed(0)}</p>
                </div>
                <div className="flex space-x-4">
                    <p className="w-3/6 text-start text-sm font-medium">Cantidad:</p>
                    <p className="w-3/6 text-start text-xs font-semibold">{detail?.data?.crypto?.quantity}</p>
                </div>
                <div className="flex space-x-4">
                    <p className="w-3/6 text-start text-sm font-medium">Email</p>
                    <p className="w-3/6 text-start text-xs font-semibold">{detail?.data?.userId?.email}</p>
                </div>
            </div>
            <div className="flex space-x-4 justify-center items-center mt-4">
                <button className="w-24 rounded-full p-2 outline-none bg-green-600 text-white "
                    onClick={() => aprobatePurchase('aprobada')}
                >Aprobar</button>
                <button className="w-24 rounded-full p-2 outline-none bg-red-400 text-white"
                    onClick={() => aprobatePurchase('declinada')}
                >Rechazar</button>
            </div>

        </div>
    )
}

export default Details
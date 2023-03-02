import React, { useContext, useState } from 'react'
import { sendPaymentReferred } from '../../providers/api/referred.queries';
import { Icons } from '../../utils/icons'
import { Context } from '../../providers/user/context';
import { useToasts } from 'react-toast-notifications';
import { toastTypes, viewFormData } from '../../utils/helpers';

const CardReferred = ({ data, onClose }) => {

    const [voucher, setVouche] = useState(null);
    const [file, setFile] = useState(null);
    const { user, setUser } = useContext(Context);
    const { addToast } = useToasts();
    const [load, setLoad] = useState(false);
    const handleChangeFile = async (data) => {

        if (data) {
            const _file = data.target.files[0];
            if (_file) {
                setFile({ ...file, doc: _file });
            }
        }
    }



    const onAprobatePayment = async () => {
        setLoad(true);
        const payload = new FormData();
        payload.append("voucher", file?.doc);
        viewFormData(payload);
        const res = await sendPaymentReferred(data?._id?._id, payload);
        if (res) {
            setLoad(false);
            addToast('Pago aprobado exitosamente',
                { appearance: toastTypes.SUCCESS });
            onClose(data);
        } else {
            setLoad(false);
        }
    }




    return (

        <div className='min-w-[360px]  border p-4 rounded-lg text-md'>
            <h1 className='text-center text-lg'>Detalle del usuario</h1>
            <div className='grid grid-cols-2 gap-2 pt-4'>
                <span className='text-gray-600 max-w-[100px]'>Nombre:</span>
                <span className='text-sm text-grey-light text-end'>{data?._id?.fullName}</span>
            </div>
            <div className='grid grid-cols-2 gap-2'>
                <span className='text-gray-600 text-sm '>Email:</span>
                <span className='text-sm  text-grey-light'>{data?._id?.email}</span>
            </div>
            <div className='grid grid-cols-2 gap-0 mt-6'>
                <div className='flex justify-center items-center flex-col'>
                    <span className='font-semibold max-w-[100px] text-sm'>Cantidad</span>
                    <span className='font-light max-w-[100px] text-grey-light '>{data?.qty}</span>
                </div>
                <div className='flex justify-center items-center flex-col'>
                    <span className='font-semibold text-sm'>Valor</span>
                    <span className='font-light text-menu'>${data?.value}USD</span>
                </div>
            </div>
            {/* <div className='flex space-x-4 items-center'>
                <div className="w-24 h-24 outline-none text-grey rounded-lg mt-8 bg-white lg:mr-2 flex justify-center items-center
                  border-2 overflow-hidden cursor-pointer ">

                    <p className='text-[50px] '>
                        {Icons?.addFile}
                    </p>
                    <input
                        // accept="application/pdf"
                        type="file"
                        id="image-profile"
                        name="file"
                        className="bg-grey w-24 h-24 absolute opacity-0 cursor-pointer outline-none"
                        onChange={handleChangeFile}

                    />
                </div>
                <p className='ml-2 text-grey font-semibold text-sm'>{file?.doc?.name ? file?.doc?.name : 'Cargar'}</p>
            </div> */}



            <div className='flex space-x-8 mt-6 w-full  justify-center'>
                <button
                    disabled={load}
                    onClick={() => onAprobatePayment()}
                    className='text-white font-semibold px-4 bg-menu h-11 rounded-lg max-w-[100px] disabled:opacity-75'>
                    Aprobar
                </button>
                <button
                    onClick={() => onClose()}
                    className='text-white font-semibold px-4 bg-red-500 h-11 rounded-lg max-w-[100px]'>
                    Cancelar
                </button>
            </div>
        </div>
    )
}

export default CardReferred

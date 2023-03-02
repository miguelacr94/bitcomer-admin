import React from 'react'
import { useState } from 'react'
import { Icons } from '../../utils/icons'
import moment from 'moment';
import Select2 from '../Ui/Select2';
import { capitalizer, currencyFormat, myRound } from '../../utils/helpers';
import { updateStateGiro } from '../../providers/api/transaction.queries';
import { useEffect } from 'react';
import { useDownload } from '../../utils/hoocks/useDownload';
import Modal from 'react-responsive-modal';

const GiroDetails = ({ onBack, giroDetail, resDetail }) => {

    const [stateGiro, setStateGiro] = useState(null);
    const [details, setDetails] = useState(null);
    const [view, setView] = useState(false);


    const states = [

        { name: 'pendiente' }
        ,

        // { name: 'aprobada' }
        // ,

        { name: 'declinada' }
        ,

        { name: 'completado' }

    ]


    useEffect(() => {
        setDetails(giroDetail);
    }, [setDetails])



    const updateState = async (e) => {  // actualiza estado del giro 
        const payload = {
            status: e.name
        }
        const res = await updateStateGiro(giroDetail?._id, payload); // actualiza estado del usuario en la base de datos
        if (res) {
            setStateGiro(res.data.status);
            resDetail(res.data)
        }

    }

    const handleDownload = (e) => { e !== 'view' ? useDownload(giroDetail?.voucher) : setView(true); }
    // recibe un evento que permite descargar o visualizar el comprobante del giro

    return (
        <div className='w-full  pt-12'>
            <a onClick={onBack} className='text-grey cursor-pointer underline mt- flex items-center'>{Icons.back} Atrás</a>
            <div className="w-containerCard  mt-6 pb-6 border rounded-xl p-6 mb-12">
                <div className={`w-full flex flex-col justify-center text-center items-center  pb-4 
                
                ${stateGiro === 'declinada' || giroDetail?.status === 'declinada' ? 'text-red-400' :
                        stateGiro === 'completado' || giroDetail?.status === 'completado' ? 'text-menu' :
                            stateGiro === 'pendiente' || giroDetail?.status === 'pendiente' ? 'text-yellow-400' :
                                stateGiro === 'aprobada' || giroDetail?.status === 'aprobada' ? 'text-green-400' :
                                    stateGiro === 'pagado' || giroDetail?.status === 'pagado' ? 'text-green-600' :

                                        ''
                    }
                
                `}>
                    <p className={` text-4xl`}>
                        {
                            stateGiro === 'pendiente' || giroDetail?.status === 'pendiente' ? Icons.warning :
                                stateGiro === 'completado' || giroDetail?.status === 'completado' ? Icons.aprobate :
                                    stateGiro === 'declinada' || giroDetail?.status === 'declinada' ? Icons.rejected :
                                        stateGiro === 'aprobada' || giroDetail?.status === 'aprobada' ? Icons.aprobate :
                                            stateGiro === 'pagado' || giroDetail?.status === 'pagado' ? Icons.aprobate :
                                                ''
                        }

                    </p>
                    <h1 className="mt-2  font-semibold text-xl text-center"> Giro  {
                        stateGiro === 'completado' || giroDetail?.status === 'completado' ? 'completado' :
                            stateGiro === 'declinada' || giroDetail?.status === 'declinada' ? 'rechazada' :
                                stateGiro === 'pendiente' || giroDetail?.status === 'pendiente' ? 'pendiente' :
                                    stateGiro === 'aprobada' || giroDetail?.status === 'aprobada' ? 'aprobado' :
                                        stateGiro === 'pagado' || giroDetail?.status === 'pagado' ? 'pagado' :
                                            ''

                    }

                    </h1 >
                </div>

                <div className='flex space-x-4 w-full items-start'>
                    <div className='w-3/6'>

                        <div className={`w-full  flex  flex-col justify-center items-center p-3  border rounded-lg`}>
                            <div>
                                <h1 className='text-center text-menu font-semibold'>Detalles del giro <span className='font-semibold text-menu'>#{giroDetail?.code} </span></h1>
                            </div>
                            <div className="w-full bg-grey-bTab h-linePurchase mt-2" />
                            <div className='w-full space-y-4 mt-2'>
                                <div className='w-full flex'>
                                    <p className='w-2/6 text-start text-sm font-semibold text-detail'>Fecha:</p>
                                    <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{moment(giroDetail.createdAt).format('L')}</p>
                                </div>
                                <div className='w-full flex'>
                                    <p className='w-3/6 text-start text-sm font-semibold text-detail'>Tipo de transferencia:</p>
                                    <p className='w-3/6 text-end  text-grey-light font-light text-sm'>{giroDetail?.purchaseType && capitalizer(giroDetail?.purchaseType)}</p>
                                </div>

                                <div className='w-full flex'>
                                    <p className='w-2/6 text-start text-sm font-semibold text-detail'>Moneda:</p>
                                    <p className='w-4/6 text-end  text-grey-light font-light text-sm flex justify-end items-center space-x-1'>
                                        {giroDetail.crypto?.cryptoId?.code}  <img className='w-4 h-4 ml-1' src={giroDetail?.crypto?.cryptoId?.image} /></p>
                                </div>
                                <div className='w-full flex'>
                                    <p className='w-2/6 text-start text-sm font-semibold text-detail'>Cantidad:</p>
                                    <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{myRound(giroDetail?.crypto?.quantity, 5)}</p>
                                </div>
                                <div className='w-full flex'>
                                    <p className='w-2/6 text-start text-sm font-semibold text-detail'>Valor:</p>
                                    <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{currencyFormat(giroDetail?.value)} USD</p>
                                </div>

                            </div>
                        </div>

                        {/* 
                            <img
                                src={file?.doc?.name && URL.createObjectURL(file?.doc)}
                                className="w-full h-full cursor-pointer outline-none"
                            /> */}


                        {giroDetail?.voucher &&
                            <div className='flex space-x-4'>
                                <div className="w-40 h-32 outline-none text-grey rounded-lg mt-8 bg-white lg:mr-2 flex justify-center items-center  border-2 overflow-hidden cursor-pointer ">


                                    <div className='flex flex-col justify-center items-center'>
                                        <p onClick={() => handleDownload('download')} className='text-[50px]'>
                                            {Icons?.downLoad}
                                        </p>
                                        <a className='text-center font-semibold text-grey text-sm'>Descargar Comprobante</a>
                                    </div>

                                </div>
                                <div className="w-40 h-32 outline-none text-grey rounded-lg mt-8 bg-white lg:mr-2 flex justify-center items-center  border-2 overflow-hidden cursor-pointer ">


                                    <div className='flex flex-col justify-center items-center'>
                                        <p onClick={() => handleDownload('view')} className='text-[50px]'>
                                            {Icons?.eyes}
                                        </p>
                                        <a className='text-center font-semibold text-grey text-sm'>Ver comprobante</a>
                                    </div>

                                </div>
                            </div>
                        }






                    </div>


                    <div className={`w-3/6 justify-start items-start   `}>


                        <div className='w-full border rounded-lg px-4 pb-4'>
                            <h1 className='w-full text-center py-3 font-semibold text-menu'>Información del beneficiario</h1>
                            <div className="w-full bg-grey-bTab h-linePurchase mt-2" />

                            {giroDetail?.payee ?
                                <div className='w-full space-y-4 mt-2'>
                                    <div className='flex w-full'>
                                        <p className='w-2/6 text-start text-sm font-semibold text-detail'>Beneficiario:</p>
                                        <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{giroDetail?.information?.name}</p>
                                    </div>
                                    <div className='flex w-full'>
                                        <p className='w-2/6 text-start text-sm font-semibold text-detail'>N° documento:</p>
                                        <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{giroDetail?.information?.document}</p>
                                    </div>

                                </div>
                                :
                                <div className='w-full space-y-4 mt-2'>
                                    <div className='flex w-full'>
                                        <p className='w-2/6 text-start text-sm font-semibold text-detail'>Beneficiario:</p>
                                        <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{giroDetail?.userId?.fullName}</p>
                                    </div>
                                    <div className='flex w-full'>
                                        <p className='w-2/6 text-start text-sm font-semibold text-detail'>N° documento:</p>
                                        <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{giroDetail?.userId?.email}</p>
                                    </div>

                                </div>
                            }


                        </div>



                        <div className='w-full border rounded-lg px-4 pb-4 mt-4'>
                            <h1 className='w-full text-center py-3 font-semibold text-menu'>Información de la sucursal</h1>
                            <div className="w-full bg-grey-bTab h-linePurchase mt-2" />

                            <div className='w-full space-y-4 mt-2'>
                                <div className='flex w-full'>
                                    <p className='w-2/6 text-start text-sm font-semibold text-detail'>Nombre:</p>
                                    <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{giroDetail?.branch?.name}</p>
                                </div>
                                <div className='flex w-full'>
                                    <p className='w-2/6 text-start text-sm font-semibold text-detail'>País:</p>
                                    <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{giroDetail?.branch?.country?.name}</p>
                                </div>
                                <div className='flex w-full'>
                                    <p className='w-2/6 text-start text-sm font-semibold text-detail'>Ciudad:</p>
                                    <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{giroDetail?.branch?.city?.name}</p>
                                </div>
                                <div className='flex w-full'>
                                    <p className='w-2/6 text-start text-sm font-semibold text-detail'>Dirección:</p>
                                    <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{giroDetail?.branch?.address}</p>
                                </div>
                            </div>


                        </div>

                        {giroDetail?.status !== 'aprobada' && giroDetail?.status !== 'pagado' ?
                            < div className={`w-full  flex  justify-start items-start  space-x-4 pt-4 `}>
                                <div className="mt-4">
                                    <Select2
                                        id='state'
                                        name='state'
                                        label='Estado de transacción'
                                        colorLabel={'text-detail'}
                                        value={stateGiro ? capitalizer((stateGiro && stateGiro)) : capitalizer(states.find((e) => e.name === giroDetail?.status)?.name)}
                                        defaultValue={stateGiro ? capitalizer((stateGiro && stateGiro)) : capitalizer(states.find((e) => e.name === giroDetail?.status)?.name)}
                                        onChange={(e) => updateState(e)}

                                        disabled={stateGiro == 'completado' || giroDetail?.status === 'completado'}
                                        items={states}
                                        placeholder="Estado de transacción"
                                        className="bg-white"
                                    />
                                </div>
                            </div>

                            :
                            <p className='text-grey font-semibold text-sm flex items-center mt-4'><span className='text-yellow-400 text-lg mr-1'>{Icons.warning}</span> Una vez aprobado o pagado el giro no podrá cambiar su estado</p>
                        }
                    </div>
                </div>

                <Modal
                    open={view}
                    onClose={() => setView(false)}
                    center
                >
                    <div >
                        <img
                            src={giroDetail?.voucher}
                        />
                    </div>

                </Modal>

            </div>
        </div >
    )
}

export default GiroDetails
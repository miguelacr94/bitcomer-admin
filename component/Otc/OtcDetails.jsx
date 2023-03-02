import React, { useState } from 'react'
import { capitalizer } from '../../utils/helpers';
import { Icons } from '../../utils/icons';
import Select2 from '../Ui/Select2';
import moment from 'moment';
import { useEffect } from 'react';
import { getCountryRegister } from '../../providers/api/list.queries';
import { updateStateOtc } from '../../providers/api/transaction.queries';


const OtcDetails = ({ detailOtc, onBack, data, resp }) => {

    const [stateSale, setStateSale] = useState(null)
    const [country, setCountry] = useState(null);
    const [details, setDetails] = useState(null);

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
        setDetails(detailOtc);
    }, [setDetails])


    const getCountries = async () => {
        const res = await getCountryRegister();
        if (res) {
            setCountry(res.data);

        }
    }

    useEffect(() => {
        getCountries();
    }, [setCountry]);


    const updateState = async (e) => {

        const payload = {
            status: e.name
        }

        const res = await updateStateOtc(detailOtc?._id, payload);
        if (res) {

            setStateSale(res.data.status);
            resp(res.data);
        }

    }




    return (
        <div className='w-full  pt-12'>
            <a onClick={onBack} className='text-grey cursor-pointer underline mt- flex items-center'>{Icons.back} Atrás</a>
            <div className="w-containerCard  mt-6 pb-6 border rounded-xl p-6 mb-12">


                <div className={`w-full flex flex-col justify-center text-center items-center  pb-4 
                
${stateSale === 'declinada' || detailOtc?.status === 'declinada' ? 'text-red-400' :
                        stateSale === 'completado' || detailOtc?.status === 'completado' ? 'text-green-400' :
                            stateSale === 'pendiente' || detailOtc?.status === 'pendiente' ? 'text-yellow-400' :

                                ''
                    }

`}>
                    <p className={` text-4xl`}>
                        {
                            stateSale === 'pendiente' || detailOtc?.status === 'pendiente' ? Icons.warning :
                                stateSale === 'completado' || detailOtc?.status === 'completado' ? Icons.aprobate :
                                    stateSale === 'declinada' || detailOtc?.status === 'declinada' ? Icons.rejected :
                                        ''
                        }

                    </p>
                    <h1 className="mt-2  font-semibold text-xl text-center"> Venta OTC  {
                        stateSale === 'completado' || detailOtc?.status === 'completado' ? 'completada' :
                            stateSale === 'declinada' || detailOtc?.status === 'declinada' ? 'rechazada' :
                                stateSale === 'pendiente' || detailOtc?.status === 'pendiente' ? 'pendiente' : ''
                    }

                    </h1 >
                </div>

                <div className='flex space-x-4'>

                    <div className={`w-full  flex  flex-col justify-center items-center p-3 pt-4 border rounded-lg`}>
                        <div>
                            <h1 className='text-center text-menu font-semibold'>Detalles de la venta <span className='font-semibold text-menu'>#{detailOtc.code} </span></h1>
                        </div>
                        <div className="w-full bg-grey-bTab h-linePurchase mt-2" />
                        <div className='w-full space-y-4 mt-2'>
                            <div className='w-full flex'>
                                <p className='w-2/6 text-start text-sm font-semibold text-detail'>Fecha:</p>
                                <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{moment(detailOtc.createdAt).format('L')}</p>
                            </div>
                            <div className='w-full flex'>
                                <p className='w-3/6 text-start text-sm font-semibold text-detail'>Tipo de transferencia:</p>
                                <p className='w-3/6 text-end  text-grey-light font-light text-sm'>{detailOtc?.TransferType ? detailOtc?.TransferType : 'Internacional'}</p>
                            </div>

                            <div className='w-full flex'>
                                <p className='w-2/6 text-start text-sm font-semibold text-detail'>Moneda:</p>
                                <p className='w-4/6 text-end  text-grey-light font-light text-sm flex justify-end items-center space-x-1'>
                                    {detailOtc.crypto?.cryptoId?.code}  <img className='w-4 h-4 ml-1' src={detailOtc.crypto?.cryptoId?.image} /></p>
                            </div>
                            <div className='w-full flex'>
                                <p className='w-2/6 text-start text-sm font-semibold text-detail'>Cantidad:</p>
                                <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{detailOtc.crypto?.quantity}</p>
                            </div>

                        </div>
                    </div>

                    <div className={`w-full  flex  flex-col justify-center items-center p-3 pt-4 border rounded-lg`}>
                        <h1 className='w-full text-center py-3 font-semibold text-menu'>Información bancaria</h1>
                        <div className="w-full bg-grey-bTab h-linePurchase mt-2" />
                        <div className='w-full space-y-4 mt-2'>
                            <div className='w-full flex'>
                                <p className='w-2/6 text-start text-sm font-semibold text-detail'>Banco:</p>
                                <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{capitalizer(detailOtc?.account?.bank)}</p>
                            </div>
                            <div className='flex w-full'>
                                <p className='w-2/6 text-start text-sm font-semibold text-detail'>Numero de cuenta:</p>
                                <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{detailOtc?.account?.number}</p>
                            </div>
                            <div className='flex w-full'>
                                <p className='w-2/6 text-start text-sm font-semibold text-detail'>Tipo de cuenta:</p>
                                <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{detailOtc?.account?.typeAccount}</p>
                            </div>
                            <div className='flex w-full'>
                                <p className='w-3/6 text-start text-sm font-semibold text-detail'>Dirección de banco:</p>
                                <p className='w-3/6 text-end  text-grey-light font-light text-sm'>{capitalizer(detailOtc?.account?.address)}</p>
                            </div>
                            <div className='flex w-full'>
                                <p className='w-3/6 text-start text-sm font-semibold text-detail'>Código SWIFT/BIT:</p>
                                <p className='w-3/6 text-end  text-grey-light font-light text-sm'>{detailOtc?.account?.code}</p>
                            </div>
                        </div>
                    </div>

                </div>


                <div className={`w-full  flex  justify-start items-start  space-x-4 pt-4 `}>

                    <div className='w-3/6 border rounded-lg p-4'>
                        <h1 className='w-full text-center py-3 font-semibold text-menu'>Información del beneficiario</h1>
                        <div className="w-full bg-grey-bTab h-linePurchase mt-2" />
                        <div className='w-full space-y-4 mt-2'>
                            <div className='flex w-full'>
                                <p className='w-2/6 text-start text-sm font-semibold text-detail'>Beneficiario:</p>
                                <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{capitalizer(detailOtc?.information?.name)}</p>
                            </div>
                            <div className='flex w-full'>
                                <p className='w-2/6 text-start text-sm font-semibold text-detail'>Dirección:</p>
                                <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{capitalizer(detailOtc?.information?.address)}</p>
                            </div>
                            <div className='flex w-full'>
                                <p className='w-2/6 text-start text-sm font-semibold text-detail'>País:</p>
                                <p className='w-4/5 text-end  text-grey-light font-light text-sm'>{
                                    detailOtc?.country?.name
                                }</p>
                            </div>
                            <div className='flex w-full'>
                                <p className='w-2/6 text-start text-sm font-semibold text-detail'>Ciudad:</p>
                                <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{detailOtc?.information?.city}</p>
                            </div>
                            <div className='flex w-full'>
                                <p className='w-2/6 text-start text-sm font-semibold text-detail'>Region:</p>
                                <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{capitalizer(detailOtc?.information?.region)}</p>
                            </div>
                            <div className='w-full flex'>
                                <p className='w-2/6 text-start text-sm font-semibold text-detail'>Código postal:</p>
                                <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{detailOtc?.information?.potalCode}</p>
                            </div>
                        </div>

                    </div>
                    <div className={`w-3/6  flex  justify-start items-start  space-x-4 pt-4 `}>
                        <div className="mt-4">
                            <Select2
                                id='state'
                                name='state'
                                label='Estado de transacción'
                                colorLabel={'text-detail'}
                                value={stateSale ? capitalizer((stateSale && stateSale)) : capitalizer(states.find((e) => e.name === detailOtc?.status).name)}
                                defaultValue={stateSale ? capitalizer((stateSale && stateSale)) : capitalizer(states.find((e) => e.name === detailOtc?.status).name)}
                                onChange={(e) => updateState(e)}

                                disabled={stateSale == 'completado' || detailOtc?.status === 'completado'}
                                items={states}
                                placeholder="Estado de transacción"
                                className="bg-white"
                            />
                        </div>
                    </div>

                </div>

            </div >

        </div>

    )
}

export default OtcDetails
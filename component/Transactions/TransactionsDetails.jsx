import React, { useEffect, useState } from 'react'
import ReadQr from './ReadQr';
import Modal from "react-responsive-modal";
import moment from 'moment';
import { Icons } from '../../utils/icons';
import Select2 from '../Ui/Select2';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { aprobateTransaction } from '../../providers/api/transaction.queries';
import { capitalizer, currencyFormat } from '../../utils/helpers';


const schema = yup.object({
    // fullName: yup.string().required("Nombre es requerido"),
    // address: yup.string().required("Dirección es requerida"),
    // country: yup.string().required("Pais es requerido"),
    // // city: yup.string().required("Ciudad es requerida")
    // email: yup.string().required('Falta el email electrónico.').matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Por favor, ingresa una direccción de email válida"),
    // password: yup.string().required("Contraseña requerida").matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){0})((?=.*[A-Z]){0}).*$/, "ingresa 8 o más casacteres con una combinación de letras, numeros y símbolos")

});



const TransactionsDetails = ({ data, transaction }) => {

    const [showModal, setShowModal] = useState(false);
    const [detail, setDetail] = useState(null);


    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({ resolver: yupResolver(schema) });

    useEffect(() => {
        setDetail(data);
    }, [setDetail, data]);

    const [statePurchase, setStatePurchase] = useState(null)


    const onChangeState = async (e) => {
        setStatePurchase(e);

        const id = data?._id;
        const payload = {
            status: e.name,
        }

        const res = await aprobateTransaction(id, '', payload);
        if (res) {
            setDetail(res?.data);
            transaction(res?.data)
        }
    }


    return (
        <div className="w-5/6 justify-start items-center  mt-6">

            <div
                className={`${detail?.status === 'pendiente' ? 'text-textPending' :
                    detail?.status === 'aprobada' ? 'text-aprobada' :
                        detail?.status === 'pagado' ? 'text-green-400' :
                            detail?.status === 'completado' ? 'text-aprobada' :
                                detail?.status === 'declinada' ? 'text-red-500' :
                                    detail?.status === 'transferida' ? 'text-yellow-500' :
                                        detail?.status === 'entregada' ? 'text-blue-400' :

                                            ''} flex flex-col justify-center items-center`}>
                <p className="text-3xl"
                >{detail && detail?.status === 'pendiente' ? Icons.warning :
                    detail?.status === 'aprobada' ? Icons.aprobate :
                        detail?.status === 'pagado' ? Icons.aprobate :
                            detail?.status === 'completado' ? Icons.aprobate :
                                detail?.status === 'declinada' ? Icons.rejected :
                                    detail?.status === 'transferida' ? Icons.transferido :
                                        detail?.status === 'entregada' ? Icons.entregada :

                                            ''}</p>
                <p>Orden {detail?.status}</p>


            </div>

            <div className="flex space-x-2 w-full mt-4">

                <div className="w-3/6 h-72 "  >
                    <h2 className="text-menu font-semibold text-lg">Detalles de transacción</h2>
                    <div className="border p-4 mt-4 space-y-4 text-xs pb-8 rounded-lg shadow-lg">
                        <div className="flex w-full">
                            <p className="w-3/6 text-start  text-detail font-bold">País de transacción</p>
                            <p className="w-3/6 text-end text-grey">{data && capitalizer(data?.country?.name)}</p>
                        </div>

                        <div className="flex w-full">
                            <p className="w-3/6 text-start  text-detail font-bold">Tipo de transacción</p>
                            <p className="w-3/6 text-end text-grey">{data && capitalizer(data?.purchaseType)}</p>
                        </div>

                        <div className="flex w-full">
                            <p className="w-3/6 text-start  text-detail font-bold">Cliente</p>
                            <p className="w-3/6 text-end text-grey">{data && capitalizer(data?.userId?.fullName)}</p>
                        </div>
                        <div className="flex w-full">
                            <p className="w-3/6 text-start text-detail font-bold">Código</p>
                            <p className="w-3/6 text-end  text-detail font-semibold">{data?.code}</p>
                        </div>
                        <div className="flex w-full">
                            <p className="w-3/6 text-start text-detail font-bold">Fecha</p>
                            <p className="w-3/6 text-end text-grey">{moment(data?.createdAt).format('L')}</p>
                        </div>
                        <div className="flex w-full">
                            <p className="w-3/6 text-start text-detail font-bold">Método de pago</p>
                            <p className="w-3/6 text-end  text-grey">{data && capitalizer(data?.paymentMethod)}</p>
                        </div>
                        {data?.wallet &&
                            <div className="flex w-full">
                                <p className="w-2/6 text-start text-detail font-bold">wallet</p>
                                <p className="w-4/6 text-end text-grey">{data?.wallet}</p>
                            </div>

                        }

                        <div className="flex w-full">
                            <p className="w-3/6 text-start text-detail font-bold">Cripto</p>
                            <div className='flex justify-end items-center w-3/6 space-x-1'>
                                <img className='w-5 h-5' src={data?.crypto?.cryptoId?.image} />
                                <p className=" text-end  text-grey">{data?.crypto?.cryptoId?.name}</p>
                            </div>

                        </div>
                        <div className="flex w-full">
                            <p className="w-3/6 text-start text-detail font-bold">Red</p>


                            <p className="w-3/6 text-end  text-grey">{data?.network}</p>


                        </div>
                        <div className="flex w-full">
                            <p className="w-3/6 text-start text-detail font-bold">Cantidad</p>

                            {data?.purchaseType == 'giro' ?
                                <p className="w-3/6 text-end  text-grey">{data?.crypto?.quantity.toFixed(2)}</p>
                                :
                                <p className="w-3/6 text-end  text-grey">{data?.crypto?.quantity.toFixed(6)}</p>
                            }




                        </div>

                        {data?.information &&
                            <div className='space-y-2'>
                                <h1 className='text-center font-semibold text-md'>Información del beneficiario</h1>
                                <div className="flex w-full">
                                    <p className="w-3/6 text-start text-detail font-bold">Nombre:</p>
                                    <p className="w-3/6 text-end  text-grey">{data?.information?.name}</p>
                                </div>

                                <div className="flex w-full">
                                    <p className="w-3/6 text-start text-detail font-bold">Documento:</p>
                                    <p className="w-3/6 text-end  text-grey">{data?.information?.document}</p>
                                </div>

                            </div>
                        }
                        {data?.information &&
                            <div className='space-y-2'>
                                <h1 className='text-center font-semibold text-md'>Información de sucursal</h1>
                                <div className="flex w-full">
                                    <p className="w-3/6 text-start text-detail font-bold">Nombre:</p>
                                    <p className="w-3/6 text-end  text-grey">{data?.information?.name}</p>
                                </div>

                                <div className="flex w-full">
                                    <p className="w-3/6 text-start text-detail font-bold">Documento:</p>
                                    <p className="w-3/6 text-end  text-grey">{data?.information?.document}</p>
                                </div>

                            </div>
                        }

                        {data?.account &&
                            <div className='space-y-2'>
                                <h1 className='text-center font-semibold text-md'>Información de bancaria</h1>
                                <div className="flex w-full">
                                    <p className="w-3/6 text-start text-detail font-bold">Banco:</p>
                                    <p className="w-3/6 text-end  text-grey">{data?.account?.bank}</p>
                                </div>

                                <div className="flex w-full">
                                    <p className="w-3/6 text-start text-detail font-bold">N° cuenta:</p>
                                    <p className="w-3/6 text-end  text-grey">{data?.account?.number}</p>
                                </div>
                                <div className="flex w-full">
                                    <p className="w-3/6 text-start text-detail font-bold">Tipo de cuenta:</p>
                                    <p className="w-3/6 text-end  text-grey">{data?.account?.typeAccount}</p>
                                </div>
                                <div className="flex w-full">
                                    <p className="w-3/6 text-start text-detail font-bold">Titular:</p>
                                    <p className="w-3/6 text-end  text-grey">{data?.account?.userName}</p>
                                </div>
                                <div className="flex w-full">
                                    <p className="w-3/6 text-start text-detail font-bold">N° documento:</p>
                                    <p className="w-3/6 text-end  text-grey">{data?.account?.nit}</p>
                                </div>
                            </div>
                        }

                    </div>

                </div>
                <div className="w-3/6 h-72 "  >
                    <h2 className="text-menu font-semibold text-lg">Totales</h2>
                    <div className="border rounded-xl shadow-lg p-4 mt-4 space-y-4 text-xs pb-8">

                        <div className="flex w-full">
                            <p className="w-3/6 text-start text-detail font-bold">Pago comisión</p>
                            <p className="w-3/6 text-end text-grey ">{data?.commission}%</p>
                        </div>
                        <div className="flex w-full">
                            <p className="w-3/6 text-start text-detail font-bold">Moneda</p>
                            <p className="w-3/6 text-end text-grey ">{data?.currency}</p>
                        </div>

                        <div className="flex w-full">
                            <p className="w-3/6 text-start  text-detail font-bold">Pago total</p>
                            <p className="w-3/6 text-end text-grey ">{currencyFormat(data?.value)}</p>
                        </div>

                    </div>

                    <div className="mt-4">
                        <Select2
                            id='city'
                            name='city'
                            label='Estado de transacción'
                            colorLabel={'text-menu'}
                            value={capitalizer((statePurchase && statePurchase.name) || data?.status)}
                            defaultValue={capitalizer((statePurchase && statePurchase.name) || data?.status)}
                            onChange={(e) => onChangeState(e)}
                            onSelect={(e) => setCity(e)}
                            // disabled={data?.status == 'completado' || data?.status === 'pagado'}
                            
                            items={[

                                { name: 'pendiente' }
                                ,

                                { name: 'aprobada' }
                                ,

                                { name: 'declinada' }
                                ,

                                { name: 'completado' }

                            ]}
                            placeholder="Estado de transacción"
                            className="bg-white"
                            control={control}
                            register={register}
                            hint={
                                errors.city?.type === "required" || errors.city?.message
                                    ? errors.city?.message
                                    : ""
                            }
                            errors={
                                errors.city?.type === "required" || errors.city?.message
                                    ? true
                                    : false
                            }
                        />
                    </div>
                    {data && !data?.qr || data?.qr === null ?
                        ''
                        :
                        <>



                            {/* <button
                                className="p-1 bg-menu mt-8 text-white px-4 rounded-full"
                                onClick={() => setShowModal(true)}
                            >Verificar codigo QR
                            </button> */}
                        </>
                    }
                </div>
            </div>



            <Modal
                open={showModal}
                onClose={() => setShowModal(false)}
                center
            >
                <ReadQr
                    data={data}
                    onClose={() => setShowModal(false)}
                    resp={(e) => setDetail(e)}
                />


            </Modal>

            {/* <button className="p-2 bg-menu h-10">Leer Boton Qr</button> */}
            {/* <ReadQr /> */}



        </div>
    )
}

export default TransactionsDetails

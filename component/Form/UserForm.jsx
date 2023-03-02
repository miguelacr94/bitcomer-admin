import React, { useState } from 'react';
import Input from '../Ui/Input';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { Icons } from '../../utils/icons';
import { updateUser } from '../../providers/api/user.queries';
import { useToasts } from 'react-toast-notifications';
import { toastTypes } from '../../utils/helpers';



const schema = yup.object({
    fullName: yup.string().required("Nombre es requerido"),
    email: yup.string().required('Falta el email electrónico.').matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Por favor, ingresa una direccción de email válida"),
    phone: yup.string().required('Teléfono es requerido')
    // address: yup.string().required("Dirección es requerida"),
    // country: yup.string().required("Pais es requerido"),
    // // city: yup.string().required("Ciudad es requerida")
    // email: yup.string().required('Falta el email electrónico.').matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Por favor, ingresa una direccción de email válida"),
    // password: yup.string().required("Contraseña requerida").matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){0})((?=.*[A-Z]){0}).*$/, "ingresa 8 o más casacteres con una combinación de letras, numeros y símbolos")

});



const UserForm = ({ user, resData }) => {

    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({ resolver: yupResolver(schema) });

    const [load, setLoad] = useState(false);
    const { addToast } = useToasts();

    const onSendData = async (data) => {

        const payload = {
            fullName: data?.fullName,
            email: data?.email,
            phone: {
                number: data?.phone,
                code: user?.phone?.code
            },
            fee: data?.referredValue


        }

        const res = await updateUser(user?._id, payload);
        if (res) {
            resData(res?.data);
            addToast("Datos actualizados exitosamente", {
                appearance: toastTypes.SUCCESS,
            });
        } else {
            addToast("Error al actualizar datos", {
                appearance: toastTypes.ERROR,
            });
        }


    }
    return (
        <div>
            <form className='grid grid-cols-2 gap-4' onSubmit={handleSubmit(onSendData)}>
                <div>
                    <Input
                        id='fullName'
                        name='fullName'
                        label={'Nombre completo'}
                        register={register}
                        control={control}
                        defaultValue={user?.fullName}
                        hint={
                            errors.fullName?.type === "required" || errors.fullName?.message
                                ? errors.fullName?.message
                                : ""
                        }
                        errors={
                            errors.fullName?.type === "required" || errors.fullName?.message
                                ? true
                                : false
                        }
                    />
                    <Input
                        id='email'
                        name='email'
                        label={'Correo electrónico'}
                        register={register}
                        control={control}
                        defaultValue={user?.email}
                        hint={
                            errors.email?.type === "required" || errors.email?.message
                                ? errors.email?.message
                                : ""
                        }
                        errors={
                            errors.email?.type === "required" || errors.email?.message
                                ? true
                                : false
                        }
                    />
                    <Input
                        id='phone'
                        name='phone'
                        label='Teléfono'
                        register={register}
                        control={control}
                        defaultValue={user?.phone?.number}
                        hint={
                            errors.phone?.type === "required" || errors.phone?.message
                                ? errors.phone?.message
                                : ""
                        }
                        errors={
                            errors.phone?.type === "required" || errors.phone?.message
                                ? true
                                : false
                        }
                    />
                </div>
                <div>
                    <Input
                        id='referredValue'
                        name='referredValue'
                        label='Monto por referido'
                        type='number'
                        register={register}
                        control={control}
                        defaultValue={user?.fee}
                        hint={
                            errors.requiredValue?.type === "required" || errors.referredValue?.message
                                ? errors.referredValue?.message
                                : ""
                        }
                        errors={
                            errors.referredValue?.type === "required" || errors.referredValue?.message
                                ? true
                                : false
                        }
                    />
                </div>
                <button

                    disabled={
                        load
                    }
                    className='bg-menu mt-6 disabled:opacity-75 disabled:cursor-not-allowed  w-40 text-white h-11 rounded-full font-semibold flex justify-center items-center'>

                    {load ? <p className="animate-spin h-4 w-4  flex justify-center items-center text-white">{Icons.Load}</p> : 'Actualizar'}

                </button>
            </form>
        </div>
    )
}

export default UserForm

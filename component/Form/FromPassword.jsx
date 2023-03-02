import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import * as yup from 'yup';
import { updateUser } from '../../providers/api/user.queries';
import { toastTypes } from '../../utils/helpers';
import { Icons } from '../../utils/icons';
import Input from '../Ui/Input';

const schema = yup.object({
    password: yup.string().required("Contraseña requerida"),
    repassword: yup.string().required("Contraseña requerida"),
});


const FromPassword = ({ user }) => {

    const {
        register,
        control,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm({ resolver: yupResolver(schema) });


    const [load, setLoad] = useState(false);
    const [error, setError] = useState(null);
    const { addToast } = useToasts();

    const sendPassword = async (data) => {
        if (data?.password !== data?.repassword) {
            return setError('Contraseñas no coinciden');
        } else {
            setError('');
            const res = await updateUser(user?._id, data);
            if (res) {
                addToast("Contraseña actualizada con éxito", {
                    appearance: toastTypes.SUCCESS,
                });
                reset();
            } else {
                addToast("Error al actualizar contraseña", {
                    appearance: toastTypes.ERROR,
                });
            }
        }
    }


    return (
        <div>
            <form onSubmit={handleSubmit(sendPassword)}>
                <div>
                    <Input
                        type='password'
                        id='password'
                        name='password'
                        label={'Contraseña'}
                        register={register}
                        control={control}
                        defaultValue={''}
                        hint={
                            errors.password?.type === "required" || errors.password?.message
                                ? errors.password?.message
                                : ""
                        }
                        errors={
                            errors.password?.type === "required" || errors.password?.message
                                ? true
                                : false
                        }
                    />
                    <Input
                        type='password'
                        id='repassword'
                        name='repassword'
                        label={'Confirmar contraseña'}
                        register={register}
                        control={control}
                        defaultValue={''}
                        hint={
                            errors.repassword?.type === "required" || errors.repassword?.message
                                ? errors.password?.message
                                : ""
                        }
                        errors={
                            errors.repassword?.type === "required" || errors.repassword?.message
                                ? true
                                : false
                        }
                    />
                </div>

                <p className='text-red-400 text-sm py-4'>{error}</p>
                <button

                    disabled={
                        load
                    }
                    className='bg-menu mt-4 disabled:opacity-75 disabled:cursor-not-allowed  w-40 text-white h-11 rounded-full font-semibold flex justify-center items-center'>

                    {load ? <p className="animate-spin h-4 w-4  flex justify-center items-center text-white">{Icons.Load}</p> : 'Actualizar'}

                </button>
            </form>
        </div>
    )
}

export default FromPassword

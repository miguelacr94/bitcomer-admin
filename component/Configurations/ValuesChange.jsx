
import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import Input from '../Ui/Input';
import { useForm } from 'react-hook-form';
import { updateCurrency } from '../../providers/api/transaction.queries';
import { toastTypes } from '../../utils/helpers';
import { useToasts } from "react-toast-notifications";
import { Icons } from '../../utils/icons';

const schema = yup.object({
    // fullName: yup.string().required("Nombre es requerido"),
    // address: yup.string().required("Direccion es requerida"),
    // country: yup.string().required("Pais es requerido"),
    // // city: yup.string().required("Ciudad es requerida")
    // email: yup.string().required('Falta el email electrónico.').matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Por favor, ingresa una direcccion de email válida"),
    // password: yup.string().required("Contraseña requerida").matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){0})((?=.*[A-Z]){0}).*$/, "ingresa 8 o más casacteres con una combinación de letras, numeros y símbolos")

});


const ValuesChange = ({ value, resp, onClose }) => {

    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({ resolver: yupResolver(schema) });

    const [form, setForm] = useState(null);
    const [load, setLoad] = useState(false);
    const { addToast } = useToasts();

    useEffect(() => {
        setForm(value);
    }, [value, setForm])


    const onChangeValue = async () => {

        const payload = {
            purchase: form.purchase,
            sale: form.sale
        }

        const idPercentage = value?._id;

        setLoad(true);
        const res = await updateCurrency(payload, idPercentage);
        if (res) {
            resp(res?.data);
            setLoad(false);
            onClose();
            addToast('Valor actualizado exitosamente',
                { appearance: toastTypes.SUCCESS });
        } else {
            addToast('Error al actualizar',
                { appearance: toastTypes.ERROR });
        }
    }



    return (
        <div className="w-80 p-4">
            <h1 className="text-center text-xl text-grey font-semibold">Detalles de moneda</h1>
            <hr className="mt-2 " />
            <div className="flex space-x-4 mt-4">
                <p className="text-black font-semibold w-48">Moneda:</p>
                <p className="text-grey">{value?.value?.crypto?.name}</p>
            </div>

            <form className="mt-6" onSubmit={handleSubmit(onChangeValue)}>
                <Input
                    id='sale'
                    name='sale'
                    label='Porcentaje de venta'
                    defaultValue={form?.sale}
                    value={(form?.sale)}
                    onChange={(e) => setForm({ ...form, sale: e.target.value })}
                    placeholder="Porcentaje de venta"
                    type='text'
                    className="bg-white"
                    control={control}
                    register={register}
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
                    id='purchase'
                    name='purchase'
                    label='Porcentaje de compra'
                    defaultValue={form?.purchase}
                    value={(form?.purchase)}
                    onChange={(e) => setForm({ ...form, purchase: e.target.value })}
                    placeholder="Porcentaje de compra"
                    type='text'
                    className="bg-white"
                    control={control}
                    register={register}
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
                <div className="flex justify-center">
                    <button
                        disabled={load}
                        className="w-40 rounded-full bg-menu h-10 text-white mt-4 m-auto disabled:opacity-75 flex justify-center items-center">
                        {load ? <p className="animate-spin h-4 w-4  flex justify-center items-center text-white">{Icons.Load}</p> : 'Actualizar'}
                    </button>
                </div>

            </form>
        </div>
    )
}

export default ValuesChange
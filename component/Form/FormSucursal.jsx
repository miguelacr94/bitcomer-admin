import React from 'react'
import { useState } from 'react';
import Input from '../Ui/Input'
import { useToasts } from "react-toast-notifications";
import { toastTypes } from '../../utils/helpers';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { useForm } from 'react-hook-form'
import Select2 from '../Ui/Select2';
import { Icons } from '../../utils/icons';
import { getAllCity, getSocio } from '../../providers/api/list.queries';
import { useEffect } from 'react';
import { sendSucursal } from '../../providers/api/home.queries';
import Select from '../Ui/Select';


const schema = yup.object({
    // fullName: yup.string().required("Nombre es requerido"),
    // address: yup.string().required("Dirección es requerida"),
    // country: yup.string().required("Pais es requerido"),
    // // city: yup.string().required("Ciudad es requerida")
    // email: yup.string().required('Falta el email electrónico.').matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Por favor, ingresa una direccción de email válida"),
    // password: yup.string().required("Contraseña requerida").matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){0})((?=.*[A-Z]){0}).*$/, "ingresa 8 o más casacteres con una combinación de letras, numeros y símbolos")

});

const FormSucursal = ({ pais }) => {

    const [form, setForm] = useState(null);
    const [load, setLoad] = useState(false);
    const [socio, setSocio] = useState([]);
    const { addToast } = useToasts();
    const [city, setCity] = useState();
    const [email, setEmail] = useState(null);


    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({ resolver: yupResolver(schema) });





    const onSave = async (e) => {

        e.preventDefault();
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
            setEmail({ ...email, message: 'Por favor, ingresa una dirección de email válida.' });
            return document.getElementById("email").focus();
        } else {
            setEmail({ ...email, message: null });
        }

        const payload = {
            partner: form.aliado?._id,
            name: form?.branch,
            country: form?.country?._id,
            email: form?.email,
            city: form?.city?._id,
            email: form?.email,
            password: form?.password,
            address: form?.address
        }


        setLoad(true);


        const res = await sendSucursal(payload);

        if (res?.response?.data?.data === 801) {
            addToast("El correo electrónico ya fue utilizado por otra sucursal", {
                appearance: toastTypes.WARNING,
            });
            setLoad(false);

        } else if (res?.success === true) {
            addToast("Sucursal registrada con éxito", {
                appearance: toastTypes.SUCCESS,
            });
            setLoad(false);
            setForm('');
        }
        else {
            setLoad(false);
            addToast("Error al registrar sucursal  ", {
                appearance: toastTypes.ERROR,
            });
        }
    }


    const getAllSocio = async () => { // trae todos loas socios registrados
        const res = await getSocio();
        if (res.data) {
            setSocio(res?.data);
        }
    }

    useEffect(() => {
        getAllSocio();
    }, [setSocio]);



    const getCities = async (idCountry) => {
        setForm({ ...form, city: '' });
        setCity('');
        const res = await getAllCity(idCountry);
        if (res) {
            setCity(res?.data);
          
        } else {
            setForm({ ...form, city: '' });
        }
    }


    useEffect(() => {
        getCities(form?.country?._id);
    }, [form?.country]);




    return (
        <form autoComplete='off' className='pb-6' >
            <div className='flex space-x-4 '>


                <div className='w-3/6'>
                    <Select2
                        id='aliado'
                        name='aliado'
                        label='Seleccione aliado'
                        colorLabel={'text-menu'}
                        value={form?.aliado?.name}
                        defaultValue={(form?.aliado?.name)}
                        onChange={(e) => setForm({ ...form, aliado: e })}
                        items={socio.map((s) => s)}
                        placeholder="aliado"
                        className="bg-white"
                        control={control}
                        width='w-80'
                        register={register}
                        search={true}
                        hint={
                            errors.country?.type === "required" || errors.country?.message
                                ? errors.country?.message
                                : ""
                        }
                        errors={
                            errors.country?.type === "required" || errors.country?.message
                                ? true
                                : false
                        }
                    />
                </div>
                <div className='w-3/6'>
                    <Input
                        id='branch'
                        name='branch'
                        label='Nombre de sucursal'
                        colorLabel={'text-menu'}
                        // defaultValue={form?.branch}
                        value={form && form?.branch}
                        onChange={(e) => setForm({ ...form, branch: e.target.value })}
                        placeholder="Nombres de sucursal"
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

                </div>

            </div>

            <div className='pb-4'>
                <div className='w-3/6'>
                    <Input
                        id='email'
                        name='email'
                        label='Correo electrónico'
                        colorLabel={'text-menu'}
                        // defaultValue={form?.email}
                        value={form && form?.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="Correo electrónico"
                        type='text'
                        className="bg-white"
                        control={control}
                        register={register}
                        hint={
                            email || email?.message
                                ? email?.message
                                : ""
                        }
                        errors={
                            email?.message
                                ? true
                                : false
                        }
                    />

                </div>
            </div>

            <div className='flex items-center justify-start w-full space-x-4'>
                <div className='w-full'>
                    <Input
                        id='address'
                        name='address'
                        label='Dirección (google)'
                        colorLabel={'text-menu'}
                        defaultValue={form && form?.address}
                        value={form && form?.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        placeholder="Ubicación en google maps"
                        type='text'
                        className="bg-white"
                        control={control}
                        register={register}
                        // icon={Icons.Arrows}
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


                </div>
            </div>
            <div className='flex space-x-4'>

                <div className='w-3/6'>
                    <Select2

                        id='country'
                        name='country'
                        label='País'
                        colorLabel={'text-menu'}
                        value={form && form?.country?.name}
                        defaultValue={form && (form?.country?.name)}
                        onChange={(e) => setForm({ ...form, country: e })}
                        items={pais && pais.map((c) => c)}
                        placeholder="país"
                        className="bg-white"
                        control={control}
                        width='w-80'
                        register={register}
                        search={true}
                        hint={
                            errors.country?.type === "required" || errors.country?.message
                                ? errors.country?.message
                                : ""
                        }
                        errors={
                            errors.country?.type === "required" || errors.country?.message
                                ? true
                                : false
                        }
                    />
                </div>
                <div className='w-3/6 items-center'>
                    <Select2

                        id='city'
                        name='city'
                        label='Ciudad'
                        colorLabel={'text-menu'}
                        defaultValue={form && (form?.city?.name)}
                        value={form && (form?.city?.name)}
                        onChange={(e) => setForm({ ...form, city: e })}
                        items={city}
                        placeholder="Ciudad"
                        className="bg-white"
                        control={control}
                        width='w-80'
                        register={register}
                        search={true}

                    />

                </div>
            </div>
            <div className='w-3/6'>
                <Input
                    id='password'
                    name='password'
                    label='Contraseña'
                    colorLabel={'text-menu'}
                    defaultValue={form && (form?.password)}
                    value={form && (form?.password)}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Contraseña"
                    type='password'
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

            </div>

            <div className='w-full flex justify-center items-center mt-8'>

                <button
                    onClick={onSave}
                    disabled={
                        !form?.aliado?.name ||
                        !form?.email ||
                        !form?.address ||
                        !form?.country ||
                        !form?.city ||
                        !form?.password

                    }
                    className='bg-menu disabled:opacity-75 disabled:cursor-not-allowed  w-40 text-white h-11 rounded-full font-semibold flex justify-center items-center'>
                    {load ? <p className="animate-spin h-4 w-4  flex justify-center items-center text-white">{Icons.Load}</p> : 'Registrar'}

                </button>
            </div>
        </form>

    )
}

export default FormSucursal
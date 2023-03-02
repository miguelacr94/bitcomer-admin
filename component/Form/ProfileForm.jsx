import React, { useContext, useEffect, useState } from 'react'
import Input from '../Ui/Input'
import Select from '../Ui/Select'
import Button from '../Ui/Button'
import { City, Country } from '../../utils/data'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { toastTypes, viewFormData } from '../../utils/helpers'
import { useToasts } from "react-toast-notifications";
import { Icons } from '../../utils/icons'
import { updateUser } from '../../providers/user/actions'
import Phone from '../Ui/Phone'


const schema = yup.object({
    // fullName: yup.string().required("Nombre es requerido"),
    // address: yup.string().required("Dirección es requerida"),
    // country: yup.string().required("Pais es requerido"),
    // // city: yup.string().required("Ciudad es requerida")
    // email: yup.string().required('Falta el email electrónico.').matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Por favor, ingresa una direccción de email válida"),
    // password: yup.string().required("Contraseña requerida").matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){0})((?=.*[A-Z]){0}).*$/, "ingresa 8 o más casacteres con una combinación de letras, numeros y símbolos")

});


const ProfileForm = ({ user, setUser, image, pais }) => {

    const [form, setForm] = useState(null);
    const [phone, setPhone] = useState(null);
    const [location, setLocation] = useState(null);
    const [country, setCountry] = useState(null);
    const [city, setCity] = useState('');
    const [load, setLoad] = useState(false);
    const { addToast } = useToasts();



    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = (e) => {
        // e.preventDefault();
        if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
        ) {
          
        } else {
            const payload = {
                fullname: form.fullName,
                country: form.country,
                city: city,
                address: form.address,
                phone: form.phone
            }
        }


    }


     useEffect(() => {
        setForm(user);
        setPhone(user?.phone);
        setLocation(user?.location);
        setCountry(user?.location?.country);
        // setCity(user.city)

    }, [user, setForm])



    const updateUserData = async () => {

        const _country = pais.find((c) => c.name === country?.name);
        const payload = new FormData();
        payload.append("fullName", form?.fullName);
        payload.append("email", form?.email);
        payload.append("phone", JSON.stringify({ number: phone?.number, code: phone?.code?.code }));
        payload.append("photo", image?.image);
        payload.append("location", JSON.stringify({ address: location?.address, country: _country?._id || country?._id })
        );
        viewFormData(payload);
        setLoad(true);
        const res = await updateUser(payload);
        if (res) {
            setLoad(false);
            setUser(res?.data);
            addToast('Actualización exitosa',
                { appearance: toastTypes.SUCCESS });
        } else {
            addToast('Error al actualizar',
                { appearance: toastTypes.ERROR });
            setLoad(false);
        }
    }



    return (
        <>
            <form onSubmit={handleSubmit(updateUserData)} >
                <Input
                    id='fullName'
                    name='fullName'
                    defaultValue={( form?.fullName)}
                    value={(form?.fullName)}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    placeholder="Nombres y apellidos"
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
                <div className="w-full flex space-x-4">
                    <div className="w-7/12">
                        <Input
                            id='email'
                            name='email'
                            defaultValue={(form && form.email)}
                            value={(form && form.email)}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="Email"
                            type='text'
                            className="bg-white"
                            control={control}
                            register={register}
                            hint={
                                errors.email?.type === "required" || errors.email?.message
                                    ? errors.fullName?.message
                                    : ""
                            }
                            errors={
                                errors.email?.type === "required" || errors.email?.message
                                    ? true
                                    : false
                            }

                        />
                    </div>
                    <div className="w-5/12 ">
                        <Phone
                            id='phone'
                            name='phone'
                            defaultValue={(phone && phone.number)}
                            value={(phone && phone?.number)}
                            valuePhone={phone && phone.code}
                            onChange={(e) => setPhone({ ...phone, number: e.target.value })}
                            code={(e) => setPhone({ ...phone, code: e })}
                            valueCode={phone && phone.code}
                            placeholder="Teléfono"
                            type='text'
                            className="bg-white"
                            control={control}
                            register={register}
                            hint={
                                errors.phone?.type === "required" || errors.phone?.number?.message
                                    ? errors.fullName?.message
                                    : ""
                            }
                            errors={
                                errors.phone?.type === "required" || errors.phone?.message
                                    ? true
                                    : false
                            }

                        />
                    </div>
                </div>

                <div className="flex w-full space-x-4">
                    {/* <div className="w-5/12">
                        <Select
                            id='country'
                            name='country'
                            value={country && country.name}
                            defaultValue={(country && country.name)}
                            onSelect={(e) => setCountry({ ...country, name: e })}
                            items={pais && pais.map((c) => c.name)}
                            placeholder="Pais"
                            className="bg-white"
                            control={control}
                            register={register}
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
                    </div> */}
                    <div className="w-7/12">
                        <Input
                            id='address'
                            name="address"
                            value={location && location.address}
                            onChange={(e) => setLocation({ ...location, address: e.target.value })}
                            placeholder="Dirección"
                            className="bg-white"
                            control={control}
                            register={register}
                            hint={
                                errors.address?.type === "required" || errors.address?.message
                                    ? errors.address?.message
                                    : ""
                            }
                            errors={
                                errors.address?.type === "required" || errors.address?.message
                                    ? true
                                    : false
                            }
                        />

                    </div>
                </div>
                <Input
                    id='phone'
                    value={form && form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="Celular"
                    className="bg-white"
                />

                <button
                    disabled={load}
                    className="bg-menu px-10 text-sm float-right mt-6 h-10 rounded-full text-white w-36 flex justify-center items-center disabled:opacity-75">
                    {load ? <p className="animate-spin h-4 w-4  flex justify-center items-center text-white">{Icons.Load}</p> : 'Actualizar'}
                </button>

            </form>



        </>

    )
}

export default ProfileForm
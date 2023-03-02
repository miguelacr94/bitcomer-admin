import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from "next/router";
import { Routes } from '../../utils/routes';
import InputAlt from '../Ui/InputAlt';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import { Modal } from "react-responsive-modal";
import ResetPassword from './ResetPassword'
import { useToasts } from "react-toast-notifications";
import ResetPasswords from './ResetPasswords';
import { Context } from '../../providers/user/context';
import Cookies from '../../utils/cookies';
import { loginUser } from '../../providers/user/actions';
import { toastTypes } from '../../utils/helpers';
import InputAlternativo from '../Ui/InputAlternativo';

const initianDate = {
    // email: "admin@gmail.com",
    // password: "bitadmin"
}


const schema = yup.object({

    email: yup.string().required('Email es requerido.').matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Por favor, ingresa una direccción de email válida."),
    password: yup.string().required("Contraseña requerida.").min(8, 'Ingresa mínimo 8 caracteres')


});


const LoginForm = () => {

    const router = useRouter();
    const [form, setForm] = useState(initianDate);
    const [loading, setLoading] = useState(false);
    const { user, setUser } = useContext(Context);
    const [focus, setFocus] = useState(0);
    const [showSendPasswordModal, setShowpaswordModal] = useState(false)
    const [sendReset, setSendReset] = useState(false)
    const { token } = router.query;
    const { addToast } = useToasts();
    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({ resolver: yupResolver(schema) });


    const singIn = async (e) => {
        // e.preventDefault();
        const payload = {
            email: form.email,
            password: form.password,
        };

        setLoading(true);
        const data = await loginUser(payload);
        if (data) {
            savaUserAndGo(data.token, data.user);
        } else {
            addToast("El usuario o la contraseña es correcto", {
                appearance: toastTypes.WARNING,
            });

            setLoading(false);
        }
        // router.push(Routes.home);

    };


    const savaUserAndGo = (token, user) => {
      
        if (!token || !user || user?.role !== 'admin') {

            return addToast("Usuario no permitido", {
                appearance: toastTypes.WARNING,
            });
        } else {
            Cookies.set("ssid", token);
            setUser(user);
            router.push(Routes.home);
        }

    }



    useEffect(() => {
        if (token) {
            setSendReset(true)
        }
    }, [token])



    return (
        <>
            <form className="w-full  mt-12 flex flex-col justify-center items-center relative" onSubmit={handleSubmit(singIn)} >

                <InputAlternativo
                    label="Ingresa tu correo electrónico"
                    id='email'
                    type="text"
                    name='email'
                    placeholder="tunombre@gmail.com"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className=""
                    register={register}
                    defaultValue={(form && form.email) || ''}
                    value={(form && form.email) || ''}
                    control={control}
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
                {/* <button className="-mt-10 underline mr-2 text-sm text-white font-medium absolute right-0" onClick={() => setShowpaswordModal(true)}>¿Olvidaste tu contraseña?</button> */}
                <InputAlternativo
                    label="Ingresa tu contraseña"
                    id='password'
                    type="password"
                    name='password'
                    placeholder="al menos 8 caracteres"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className=" mt-6"
                    register={register}
                    defaultValue={(form && form.password) || ''}
                    erros={errors}
                    control={control}
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
                <div className="flex w-full items-center justify-center">

                    <div className="w-3/12">
                        <button className="bg-menu -ml-2 w-40 h-10 rounded-full text-xl bg-white text-menu font-semibold mt-8">Ingresar</button>
                    </div>

                </div>


            </form>


            <Modal
                open={showSendPasswordModal}
                onClose={() => setShowpaswordModal(false)}
                center
            >
                <ResetPassword />


            </Modal>

            <Modal
                open={sendReset}
                onClose={() => setSendReset(false)}
                center
            >
                <ResetPasswords
                    token={token}
                />


            </Modal>
        </>
    )

}

export default LoginForm
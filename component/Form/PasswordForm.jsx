import React, { useState } from 'react'
import { useToasts } from "react-toast-notifications";
import { passwordUpdate } from '../../providers/user/actions';
import { toastTypes } from '../../utils/helpers';
import { Icons } from '../../utils/icons';

const PasswordForm = () => {

    const [load, setLoad] = useState(false);
    const [form, setForm] = useState(null);
    const [password, setPassword] = useState(false);
    const [password2, setPassword2] = useState(false);
    const { addToast } = useToasts();


    const updatePassword = async () => {


        if (!form?.re_password) {
            setPassword({ ...password, message: 'Contraseña es requerida' });
            return document.getElementById("password").focus();
        }

        else if (!/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){0})(?=.*\d)((?=.*[a-z]){0})((?=.*[A-Z]){0})((?=.*[0-9]){1}).*$/i.test(form.re_password)) {
            setPassword({ ...password, message: 'ingresa 8 o más caracteres con una combinación de letras y números' });
            return document.getElementById("password").focus();
        } else {
            setPassword({ ...password, message: null });
        }
        if (!form?.re_password2) {
            setPassword2({ ...password2, message: 'Contraseña es requerida' });
            return document.getElementById("password2").focus();
        }
        else if (form.re_password !== form.re_password2) {
            setPassword2({ ...password2, message: 'Contraseñas no coinciden' });
            return document.getElementById("password2").focus();
        } else {
            setPassword2({ ...password2, message: null });



            const payload = {
                password: form.re_password
            }

            setLoad(true);
            const res = await passwordUpdate(payload);
            if (res) {
                addToast('Cambio de contraseña exitoso',
                    { appearance: toastTypes.SUCCESS });

                setLoad(false);
            } else {
                addToast('Eror al actualizar contraseña',
                    { appearance: toastTypes.ERROR });
                setLoad(false);
            }

        }



    }

    return (
        <div className="w-full flex flex-col mt-12">
            <span className="flex space-x-2 items-center">
                <i className="bg-menu w-2 h-2 rounded-full" />
                <p className="text-black text-terminos font-semibold">Cambiar contraseña</p>
            </span>
            <div className="flex flex-col items-center justify-center w-4/6 space-y-4  px-6 pl-20 mt-12  ">
                {/* <div className="flex space-x-2 items-center">
            <p className="text-grey-light text-xs w-48">Ingresa tu antigua contraseña</p>
            <input
                type="password"
                className="border rounded-full outline-none text-sm h-7 w-48 flex text-center"
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                value={form && form.password || 'password'}
            />
        </div> */}
                <div className="flex flex-col space-x-2 items-center ">
                    <p className="text-grey-light text-xs w-48">Ingresa tu nueva contraseña</p>

                    <input
                        id="password"
                        type="password"
                        className="border rounded-full outline-none h-9 text-center text-sm w-64 border-grey-bInput mt-2 bg-white"
                        onChange={(e) => setForm({ ...form, re_password: e.target.value })}
                        value={form && form.re_password}
                    />
                    <p className="text-xs text-red-400 mt-1">{password && password?.message}</p>
                </div>
                <div className="flex flex-col space-x-2 items-center">
                    <p className="text-grey-light text-xs w-48 ">Confirma tu nueva contraseña</p>
                    <input
                        id="password2"
                        type="password"
                        className="border rounded-full outline-none h-9 text-center w-64 border-grey-bInput mt-2 bg-white"
                        onChange={(e) => setForm({ ...form, re_password2: e.target.value })}
                        value={form && form.re_password2}


                    />
                    <p className="text-xs text-red-400 mt-1">{password2 && password2?.message}</p>

                </div>
                <div className="w-full flex items-center justify-center ">
                    <button
                        disabled={load}
                        onClick={() => updatePassword()}
                        className="bg-white border border-menu text-menu px-4 rounded-full w-36 m-auto h-10 disabled:opacity-75 flex items-center justify-center ">
                        {load ? <p className="animate-spin h-4 w-4  flex justify-center items-center text-bar">{Icons.Load}</p> : 'Actualizar'}
                    </button>
                </div>

            </div>
        </div>
    )
}

export default PasswordForm
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import ImgProfile from '../component/Configurations/ImgProfile'
import Items from '../component/Configurations/Items'
import Items2 from '../component/Configurations/Items2'
import Values from '../component/Configurations/Values'
import ValueTarifa from '../component/Configurations/ValueTarifa'
import PasswordForm from '../component/Form/PasswordForm'
import ProfileForm from '../component/Form/ProfileForm'
import MainLayout from '../component/Layouts/MainLayout'
import { configCrypto, getRates } from '../providers/api/list.queries'
import { Context } from '../providers/user/context'

const Configurations = () => {

    const { user, setUser } = useContext(Context);
    const tabs = ['Perfil', 'Valores', 'Seguridad']
    const [tab, setTab] = useState('Perfil');
    const { country } = useContext(Context);
    const [item, setItems] = useState([]);
    const [rates, setRates] = useState([]);



    const getCrypto = async () => {
        const res = await configCrypto();
        if (res) {
            setItems(res?.data);
        }
    }
    useEffect(() => {
        getCrypto();
    }, [setItems]);



    const getAllRates = async () => {
        const res = await getRates();
        if (res) {
            setRates(res.data);
        
        }
    }


    useEffect(() => {
        getAllRates();
    }, [setRates])


    return (
        <MainLayout>
            <div className="w-full flex flex-col pl-20 mt-20 ">
                <div className="flex items-center space-x-4 flex">
                    <h1 className="text-2xl text-grey-welcome font-bold flex items-center ">Configuración
                    </h1>
                    <p className="text-grey ml-2 text-grey-placeholder2 ">Configura tu cuenta</p>
                </div>


                <div className="flex w-11/12 mt-12 relative justify-start">
                    <hr className="w-full absolute mt-9 " />
                    {tabs.map((t, i) => {
                        return (
                            <div key={i} onClick={() => setTab(t)}
                                className={`${t === tab ? 'border-b-8 cursor-pointer border-menu' : ''} ${t !== 'Perfil' ? 'ml-4' : ''}  h-11 w-24 flex justify-center `}
                            >
                                <p className="text-grey-placeholder cursor-pointer">{t}</p>
                            </div>
                        )
                    })

                    }
                </div>

                {tab === 'Perfil' &&

                    <div className="w-full flex flex-col mt-12">
                        <span className="flex space-x-2 items-center">
                            <i className="bg-menu w-2 h-2 rounded-full" />
                            <p className="text-black text-terminos font-semibold">Cambiar tu foto de perfil</p>
                        </span>
                        <div className="flex space-x-4 w-5/6">

                            <div className="w-2/6 mt-4 flex flex-col items-center">
                                <ImgProfile
                                    photo={user?.photo}
                                />
                                <p className="text-sm text-black font-semibold text-center w-40">Presiona click o arrastra la imagen para cambiar foto de perfil</p>
                            </div>
                            <div className="w-4/6 pr-16">
                                <ProfileForm
                                    user={user}
                                    setUser={(e) => setUser(e)}
                                    pais={country}
                                />
                            </div>
                        </div>
                    </div>
                }
                {
                    tab === 'Seguridad' &&
                    <PasswordForm />

                }
                {
                    tab === 'Valores' &&
                    <>
                        <Values
                            values={item}
                            resp={(e) => getCrypto()}
                        />


                        <ValueTarifa
                            rates={rates}
                            getRes={() => getAllRates()}

                        />
                    </>
                }

            </div>
        </MainLayout>
    )
}

export default Configurations
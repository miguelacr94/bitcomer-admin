import React from 'react'
import { logout } from '../providers/user/actions'
import { Routes } from '../utils/routes'
import Countries from './Countries'
import Notifications from './Notifications'
import { useRouter } from "next/router";
const NavBar = () => {
    const router = useRouter();

    const onLogout = () => {
        logout()
        router.push(Routes.index);
    }

    return (
        <div className="w-navBar h-12 bg-white flex shadow-md fixed">
            <div className="w-3/6 flex">
                {/* <Countries /> */}
            </div>
            <div className="w-3/6 flex justify-end items-center pr-8">
                {/* <Notifications /> */}
                <button className="underline ml-4 text-sm text-black" onClick={() => onLogout()}>Salir</button>
            </div>
            {/* <div className="w-24 h-full flex justify-center items-center px-2">

            </div> */}
        </div>
    )
}

export default NavBar
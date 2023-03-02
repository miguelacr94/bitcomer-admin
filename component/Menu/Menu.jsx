import React from 'react'
import Link from "next/link";
import { menuLink } from '../../utils/routes';
import { useRouter } from "next/router";


const Menu = () => {
    const router = useRouter();
    return (
        <div className="text-white flex flex-col  flex justify-center items-start ">

            {menuLink.map((route, index) => {
                return (

                    <Link key={index} href={route.link} passHref>
                        <div key={index} className={`${router.route == route.link ? 'bg-white text-menu' : ''} flex justify-center items-center  w-full px-8 h-itemMenu cursor-pointer rounded-l-full`}>
                            <>
                                <div className="w-8 h-full text-white flex items-center">
                                    <i className={`${router.route == route.link ? 'text-menu' : 'text-white'} text-2xl`}>{route?.icon}</i>
                                </div>
                                <a className="w-full h-8 text-start ml-2 flex justify-start items-center text-sm" >
                                    {route.name}
                                </a>
                            </>
                        </div>

                    </Link>
                )
            })}



        </div>
    )
}

export default Menu
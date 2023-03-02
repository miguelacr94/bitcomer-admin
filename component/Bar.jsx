import React, { useContext, useState } from 'react'
import Menu from './Menu/Menu'
import Avatar from './user/Avatar'
import Link from "next/link";
import { Icons } from '../utils/icons';
import Qr from './Qr';
import Countries from './Countries';
import { logout } from '../providers/user/actions';
import { QrReader } from 'react-qr-reader';
import { Routes } from '../utils/routes';
import { Context } from '../providers/user/context';
// import { Routes } from '../utils/routes'

import Modal from "react-responsive-modal";
import Qrvalidator from './Transactions/Qrvalidator';
import Redirect from './Transactions/Redirect';


const Bar = () => {



    const [showScan, setShowScan] = useState(false);




    return (
        <div className="bg-bar w-bar min-w-bar z-10 h-full  text-center fixed flex flex-col overflow-y-auto">
            <div className="h-5/6 -mt-0 min-w-bar flex flex-col items-center">
                <Link href='/home'>
                    {/* <h2 className="text-white text-4xl mt-8 font-semibold cursor-pointer ">Bitcomer</h2> */}
                    <img
                        src="./image/BITCOMER_BLANCO.svg"
                        className="absolute -mt-8 w-48 z-10 cursor-pointer"
                    />
                </Link>
                <div className="flex justify-center mt-32 w-full">
                    <Avatar />
                </div>

                <div className="mt-6 w-full">
                    <Menu />
                </div>

                <div className="h-20 flex justify-center items-center w-full mt-6">
                    <button
                        className="w-40 h-12 rounded-full bg-white text-menu rounded-full font-semibold flex space-x-2 items-center justify-center"
                        onClick={() => setShowScan(!showScan)}
                    >  <p>Escanear QR</p> <p className="w-6 h-6 mt-2">{Icons.qr}</p>
                    </button>

                </div>
            </div>
            <div className="text-xs h-1/6 flex justify-center items-end ">

            </div>


            <Modal
                open={showScan}
                onClose={() => setShowScan(false)}
                center
            >
                {/* <Redirect
                    onClose={() => setShowScan(false)}
                /> */}

                <Qrvalidator
                    data={(e) => console.log(e)}
                    onClose={() => setShowScan(false)}
                />

            </Modal>
        </div>
    )
}

export default Bar
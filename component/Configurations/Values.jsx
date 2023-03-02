import React, { useState } from 'react'
import Percentage from './Percentage'
import Tmr from './Tmr'
import Modal from "react-responsive-modal";
import ValuesChange from './ValuesChange';

const Values = ({ values, resp }) => {

    const [showModal, setShowModal] = useState(false);
    const [valueSelected, setValueSelected] = useState(null);

    const selectedItems = (v) => {

        if (v) {
            setValueSelected(v);
            setShowModal(true);
        }
    }

    return (
        <div className="w-full flex flex-col mt-8 overflow-auto">
            <span className="flex space-x-2 items-center">
                <i className="bg-menu w-2 h-2 rounded-full" />
                <p className="text-black text-terminos font-semibold">Valores</p>

            </span>
            <div className=" w-5/6 mt-6 flex flex-col items-center space-y-6">
                {values && values.map((c) => {
                    return (
                        <div className="flex flex-col justify-start ">
                            <p className="font-semibold text-md text-grey">{c.country.name}</p>
                            <div className="w-full flex grid grid-cols-3 gap-3 ">
                                {c && c?.configs?.map((v, index) => {
                                    return (
                                        <div key={index} className="flex w-64 flex-col  bg-darkBlue justify-center items-center w-full rounded-xl shadow-xl text-black  px-4  h-24 ">
                                            <div className="flex w-full justify-end space-x-2 font-semibold mt-1 text-white text-xs">

                                                <p>{v?.currency}</p>
                                            </div>

                                            <div className="w-full flex text-xs  text-white space-x-4 font-semibold">
                                                <p className="w-12">Venta</p>
                                                <p className="w-12">{v.sale}</p>
                                            </div>
                                            <div className="w-full flex text-xs  text-white space-x-4 font-semibold mt-2">
                                                <p>Compra</p>
                                                <p>{v.purchase}</p>
                                            </div>

                                            <div className="flex items-start  h-3/6 w-full text-white mt-2">
                                                <div className="w-4/6 flex items-start">
                                                    <p className=" left-0 font-normal text-xs">{v?.crypto.name} Actual</p>
                                                    <img
                                                        src={v?.crypto?.image}
                                                        className="w-4 h-4 ml-2"
                                                    />

                                                </div>
                                                <div className="w-2/6  flex items-start justify-end">
                                                    <a onClick={() => selectedItems(v)} className="underline w-5/6 right-0 text-sm cursor-pointer">Cambiar</a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })

                                }
                            </div>
                        </div>

                    )
                })}
            </div>

            {/* grid grid-cols-2 gap-2 */}


            <Modal
                open={showModal}
                onClose={() => setShowModal(false)}
                center
            >
                <ValuesChange
                    value={valueSelected}
                    resp={resp}
                    onClose={() => setShowModal(false)}
                />


            </Modal>

        </div >
    )
}

export default Values
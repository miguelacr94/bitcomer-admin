import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { getReferredList } from '../../providers/api/referred.queries';
import { Icons } from '../../utils/icons';
import { referedTitle } from '../../utils/data';
import Modal from 'react-responsive-modal';
import CardReferred from './CardReferred';

const ReferredTable = ({ className }) => {

    const [referred, setReferred] = useState(null);
    const [load, setLoad] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [referredSelected, setReferredSelected] = useState(null);

    const data = null;
    const title = null;


    const getReferred = async () => {
        setLoad(true);
        const res = await getReferredList();
        if (res) {


            setReferred(res?.data);

            setLoad(false);
        } else {
            setTimeout(() => {
                setLoad(false);
            }, 800);
        }
    }


    const onSelectedReferred = (data) => {
        if (data) {
            setReferredSelected(data);
            setOpenModal(true);
        }
    }



    useEffect(() => {
        getReferred();
    }, [setReferred]);

    const onAprobate = (e) => {

        const filter = referred.filter((r) => r?._id?._id !== e?._id?._id);
        setReferred(filter);
        setOpenModal(false);
    }


    return (
        <div className={` ${className}`}>
            {!load &&
                <>
                    {referred ?

                        <table className=" w-full mt-2 ">
                            <thead>
                                <tr className=" text-grey-head  ">
                                    {referedTitle && referedTitle.map((item, index) => {
                                        return (
                                            <th key={index} className="text-start h-8 pl-6 font-light text-sm">{item.name}</th>
                                        )
                                    })}

                                </tr>

                            </thead>
                            <tbody className="rowAlternate">


                                {
                                    referred && referred?.map((d, index) => {

                                        return (

                                            <tr key={index} className="h-10 text-xs font-semibold  text-dataTable cursor-pointer hover:bg-gray-300 ">
                                                <td className="pl-6 ">{index + 1}</td>
                                                <td className="pl-6 ">{d?._id?.fullName}</td>
                                                <td className="pl-6 ">{d?._id?.email}</td>
                                                <td className="pl-6 ">{d?.qty}</td>
                                                <td className="pl-6 ">${d?.value} USD</td>
                                                <td>
                                                    <button

                                                        disabled={load}
                                                        onClick={() => onSelectedReferred(d)}
                                                        className='bg-menu px-6 h-8 text-white font-medium rounded-lg disabled:opacity-75'>
                                                        Ver
                                                    </button>
                                                </td>

                                            </tr>
                                        )

                                    })
                                }


                            </tbody>
                        </table >
                        :

                        <span>Sin registros</span>
                    }
                </>
            }
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                center
            >
                <CardReferred
                    data={referredSelected}
                    onClose={(e) => onAprobate(e)}
                />

            </Modal>

        </div >
    )
}

export default ReferredTable

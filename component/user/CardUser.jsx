
import React, { useEffect, useState } from 'react'
import Modal from 'react-responsive-modal'
import { getTransactionsMe } from '../../providers/api/home.queries'
import { getTransactionsUser } from '../../providers/api/transaction.queries'
import { Country } from '../../utils/data'
import FromPassword from '../Form/FromPassword'
import UserForm from '../Form/UserForm'
import Transactions from '../Graphy/Transactions'
import TableTransactions from '../tables/TableTransactions'
import TableTransactionsUser from '../tables/tableTransactionsUser'
import DetailTransactions from './DetailTransactions'

const CardUser = ({ userSelect, resData }) => {

    const [load, setLoad] = useState(false);
    const [transaction, setTransactions] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [valueSelected, setValueSelected] = useState(null);
    const [dataUser, setDataUser] = useState(null);
    const [tab, setTab] = useState('formData');

    const getTransaction = async () => {

        setLoad(true);

        const res = await getTransactionsUser(userSelect?._id, page);
        if (res) {
            setTransactions(res?.data?.docs);
            setTotalPages(res?.data?.totalPages);
            setLoad(false)

        }
    }

    const getTransactionUser = async () => {

        setLoad(true);

        const res = await getTransactionsMe(userSelect?._id);
        if (res) {
            setDataUser(res?.data?.chart);
        }
    }



    useEffect(() => {
        getTransaction();
        getTransactionsUser();
        getTransactionUser();
    }, [setTransactions, setPage, page])

    const selectedItems = (v) => {

        if (v) {
            setValueSelected(v);
            setShowModal(true);
        }
    }


    return (
        <>

            <div className="mt-8 flex w-full" key={userSelect?._id}>
                <div className="flex flex-col justify-center   rounded-2xl shadow-lg w-72 pb-16 h- p-6">
                    <div className="flex flex-col justify-center items-center mt-1 ">
                        <div className="w-24 h-24 rounded-full overflow-hidden">
                            <img
                                src={userSelect?.photo}
                            />
                        </div>

                        <div className="absolute -ml-1 -mt-8 flex">
                            <i className={
                                `${userSelect?.userVerification?.account?.status === 'pending' ? 'bg-orange-400' :
                                    userSelect?.userVerification?.account?.status === 'verified' ? 'bg-green-500' :
                                        userSelect?.userVerification?.account?.status === 'rejected' ? 'bg-red-500' :
                                            userSelect?.userVerification?.account?.status === 'reviewNeeded' ? 'bg-yellow-400' :
                                                userSelect?.userVerification?.account?.status === 'waiting' ? 'bg-orange-400'
                                                    : ''}
                     w-3 h-3 rounded-full absolute ml-8 mt-8`}></i>
                            {/* <p className="text-userActive  ml-1">

                                {userSelect?.userVerification?.account?.status === 'pending' ? 'En revision' :
                                    userSelect?.userVerification?.account?.status === 'verified' ? 'Verificado' :
                                        userSelect?.userVerification?.account?.status === 'rejected' ? 'Rechazado' :
                                            userSelect?.userVerification?.account?.status === 'reviewNeeded' ? 'En revision manual' :
                                                userSelect?.userVerification?.account?.status === 'waiting' ? 'Sin verificar'
                                                    : ''}

                            </p> */}
                        </div>
                        <div className="flex justify-center items-center mt-1">
                            {Country.map((c) => {

                                if (c.name === userSelect?.location?.country?.name) {
                                    return (

                                        <>
                                            <div className="w-3 h-3 overflow-hidden rounded-full">
                                                <img
                                                    src={c.flat}
                                                    className="w-full h-full"
                                                />
                                            </div>

                                            <p className="text-userActive ml-1 font-medium mt-1">{c.name}</p>
                                        </>
                                    )
                                }
                            })


                            }


                        </div>

                    </div>
                    <p className='text-center mt-2 text-sm text-grey-cardUser font-semibold mt-4'>{userSelect?.fullName}</p>
                    <p className='text-center mt-2 text-sm text-grey-cardUser font-semibold mt-2'>{userSelect?.phone?.number}</p>
                    <p className='text-center mt-2 text-sm text-grey-cardUser font-semibold mt-2'>{userSelect?.location?.address}</p>
                    <p className='text-center mt-2 text-sm text-grey-cardUser font-semibold mt-2'>{userSelect?.typeUser}</p>
                </div>
                <div className="ml-6 w-full rounded-2xl shadow-lg p-6">

                    <div className='grid grid-cols-2 max-w-[500px]'>
                        <div onClick={() => setTab('formData')} className={`${tab == 'formData' ? 'border-b-2 border-menu' : ''}`}>
                            <span>Datos del usuario</span>
                        </div>
                        <div onClick={() => setTab('formPassword')} className={`${tab == 'formPassword' ? 'border-b-2 border-menu' : ''}`}>
                            <span>Cambiar contraseña</span>
                        </div>
                    </div>
                    <div className={`grid  ${tab == 'formData' ? 'grid-cols-1' : 'grid-cols-2'} min-h-[300px] mt-8`}>
                        {tab === 'formData' ?
                            <UserForm
                                user={userSelect}
                                resData={(e) => resData(e)}
                            />
                            : <FromPassword
                                user={userSelect}
                            />
                        }
                    </div>


                </div>



            </div>

            <div className="w-full mt-6 pr-6">

                <TableTransactionsUser
                    className="rounded-xl shadow-xl"
                    transaction={transaction && transaction}
                    totalPage={totalPages}
                    setPage={(e) => setPage(e)}
                    dataSelected={(e) => selectedItems(e)}
                />
            </div>

            <Modal
                open={showModal}
                onClose={() => setShowModal(false)}
                center
            >
                <DetailTransactions
                    data={valueSelected}
                />

            </Modal>


        </>
    )
}

export default CardUser
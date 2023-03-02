import React, { useContext, useEffect, useState } from 'react'
import Transactions from '../component/Graphy/Transactions'
import FilterDate from '../component/Orders/FilterDate'
import TableTransactions from '../component/tables/TableTransactions'
import Modal from "react-responsive-modal";
import GraphyLine2 from '../component/Graphy/GraphyLine2'
import MainLayout from '../component/Layouts/MainLayout'
import TransactionsDetails from '../component/Transactions/TransactionsDetails'
import Qrvalidator from '../component/Transactions/Qrvalidator'
import { Context } from '../providers/user/context';
import Countries from '../component/Countries';
import { useDebounce } from 'use-debounce';
import { Icons } from '../utils/icons';


const Transaction = () => {

    const [tab, setTab] = useState(1);
    const [data, setData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const { resScar, setResSacan } = useContext(Context);
    const [search, setSearch] = useState(null);
    const [valueSearch] = useDebounce(search, 500);
    const [country, setCuntry] = useState(null);



    const getData = (e) => {
        setData(e);
        setTab(2)
    }

    const onUpdateTransaction = (e) => {
        const index = transactions.findIndex((t) => t._id == e._id);

        if (index != -1) {
            transactions[index] = e;
            setTransactions([...transactions]);
        }
    }


    useEffect(() => {
        if (resScar) {
            getData(resScar);
        }

    }, [resScar])

    const clearCountry = () => {
        setCuntry('');
    }


    return (
        <MainLayout>


            <div className="w-full flex flex-col pl-20 mt-36 relative pb-12">
                {tab && tab === 2 && <a onClick={() => setTab(1)} className="absolute -mt-12 underline text-grey-light cursor-pointer">Atrás</a>}
                <div className="flex items-center space-x-4">
                    <h1 className="text-2xl text-grey-welcome font-bold">Transacciones</h1>
                    <p className="text-grey ml-2 text-grey-placeholder2 ">Todas las transacciones realizadas últimamente</p>
                </div>

                {tab && tab === 1 &&

                    <div className=" w-full xl:flex flex-row pr-8 mt-10 ">
                        <div className="lg:w-11/12 ">

                            <div className="flex pl-2 pr-12 space-x-2">



                                <div className="w-full  flex justify-start items-center space-x-3  mt-2 text-grey-placeholder2 ">
                                    <div className="border-r-3 flex items-center ">
                                        <p>{Icons.search}</p>
                                        <input
                                            onChange={(e) => setSearch(e.target.value)}
                                            value={search}
                                            type="search"
                                            placeholder='Buscar'
                                            className="pl-2 placeholder:pl-2 outline-none placeholder:text-sm w-52 bg-white"
                                        />

                                    </div>
                                    <div className="">
                                        {Icons.filter}
                                    </div>
                                    <div className="flex  justify-start items-center space-x-2 2 ">
                                        <p className="ml-9">País:</p>
                                        <Countries
                                            setSelect={(e) => setCuntry(e)}
                                            countryClean={country}
                                        />
                                    </div>
                                    {country &&
                                        <p
                                            onClick={() => clearCountry('')}
                                            className='bg-grey-bTab cursor-pointer text-white font-semibold rounded-full w-6 h-6 flex items-center justify-center'>
                                            x
                                        </p>
                                    }
                                    {/* <div className='w-10 h-10 border rounded-full ml-4 flex justify-center items-center'>
                                        <p onClick={() => clearCountry('')} className='text-grey text-xl'>{Icons.clean}</p>
                                    </div> */}

                                </div>

                            </div>


                            <TableTransactions
                                className=""
                                search={valueSearch}
                                dataTransaction={transactions}
                                dataDetail={(e) => getData(e)}
                                country={country?._id}
                            />

                        </div>

                    </div>


                }
                {tab && tab === 2 &&


                    <TransactionsDetails
                        data={data}
                        transaction={(e) => onUpdateTransaction(e)}
                    />
                }

                {

                }


            </div>

            <Modal
                open={showModal}
                onClose={() => setShowModal(false)}
                center
            >
                <Qrvalidator
                    data={(e) => setTransactions(e)}
                    onClose={() => setShowModal(false)}
                />


            </Modal>


        </MainLayout>
    )
}

export default Transaction
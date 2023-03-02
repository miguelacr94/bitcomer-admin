import React, { useContext, useEffect, useState } from 'react'
import Percentage from '../component/Configurations/Percentage'
import Tmr from '../component/Configurations/Tmr'
import Pusrchases from '../component/Graphy/Pusrchases'
import Transactions from '../component/Graphy/Transactions'
import UsersActives from '../component/Home/UsersActives'
import MainLayout from '../component/Layouts/MainLayout'
import FilterDate from '../component/Orders/FilterDate'
import TableTransactions from '../component/tables/TableTransactions'
import { getAllTransactions } from '../providers/api/home.queries'
import { Context } from '../providers/user/context'

const Home = () => {

    const { user, setUser } = useContext(Context);
    const [chart, setChart] = useState(null)
    const [load, setLoad] = useState(false);
    const [dataCount, setDataCount] = useState(null);

    const getAllTransaction = async () => {

        setLoad(true);

        const res = await getAllTransactions();
        if (res) {
            setChart(res?.data?.chart);
            setDataCount(res?.data);
        }
    }

    useEffect(() => {
        getAllTransaction();
    }, [setChart])



    return (
        <MainLayout>
            <div className="l-overflow-auto mt-12 ">



                <div className="w-9/12 ml-dash pt-6">
                    <h1 className="text-grey-welcome flex font-bold text-2xl">Bienvenido de nuevo, <p className="ml-2"> {user?.fullName}</p></h1>

                    <div className="w-full flex space-x-4 mt-6">
                        {/* <div className="gadget w-3/6 h-48 rounded-2xl px-9 py-9">
                            <div className="h-3/6">
                                <h1 className="text-white font-bold text-xl w-24">Reporte semanal</h1>
                            </div>
                            <div className="flex w-full space-x-8 h-3/6 mt-4">
                                <div className="w-4/6">
                                    <p className="text-terminos text-grey-itemDash">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.</p>
                                </div>
                                <div className="w-2/6 flex justify-end ">
                                    <img
                                        src="./image/item1.svg"
                                        className="w-16 h-16 -mt-4"
                                    />
                                </div>
                            </div>
                        </div> */}

                        {/* <div className="bg-white shadow-xl w-3/6 h-48 rounded-2xl rounded-xl px-9 py-9 ">

                            <div className="h-3/6">
                                <h1 className="text-textItem font-bold text-xl w-32">Métricas por usuario</h1>
                            </div>
                            <div className="flex w-full space-x-8 h-3/6 mt-4">
                                <div className="w-4/6">
                                    <p className="text-terminos text-textItem">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.</p>
                                </div>
                                <div className="w-2/6  flex justify-end ">
                                    <img
                                        src="./image/item2.svg"
                                        className="w-16 h-16 -mt-4"

                                    />
                                </div>
                            </div>
                        </div> */}
                    </div>




                    <div className="w-full flex flex-col space-x-4 mt-4 ">
                        <div className="w-full shadow-lg mt-6 rounded-3xl p-6 ">
                            <Transactions
                                chart={chart}
                            />
                        </div>
                        <div className="w-6/12 space-y-4 pt-6">
                            <Pusrchases
                                data={dataCount}
                            />

                            {/* <Tmr />

                            <Percentage /> */}
                        </div>
                    </div>



                </div>










                {/* <UsersActives />

                <h2 className=" font-semibold mt-6 text-sm">Dashboard</h2>
                <hr className="w-full bg-grey-line mt-2" /> */}



                {/* 
                <div className="flex justify-center items-start pr-12">
                    <div className="w-3/6 mr-2  ">

                        <div className="-mt-2">
                            <FilterDate
                                allDay={true}
                            />



                            <Transactions />
                            <div className="flex justify-end w-3/6 float-right mt-2">
                                <Pusrchases />
                            </div>
                        </div>

                    </div>
                    <div className="w-3/6 ml-6 h-full   ">
                        <div className="h-14 flex justify-start items-center mb-2">
                            <h2 className="font-semibold text-start text-xs mt-1 text-black">Últimas transacciones</h2>
                        </div>

                        <TableTransactions />

                    </div>
                </div>
 */}

            </div>

        </MainLayout >
    )
}

export default Home
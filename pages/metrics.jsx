import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import DoughnutGraphy from '../component/Graphy/Doughnut'
import GraphyLine from '../component/Graphy/GraphyLine'
import Scale from '../component/Graphy/Scale'
import MainLayout from '../component/Layouts/MainLayout'
import { getAllReport } from '../providers/api/transaction.queries'
import { data2, options2, data3, options3, data4, options4 } from '../utils/__data'



const metrics = () => {

    const [report, setReport] = useState(null);

    const getGenralReport = async () => {
        const res = await getAllReport();
        if (res) {
          
            
            setReport(res);
        }
    }

    useEffect(() => {

        getGenralReport();

    }, [setReport])


    return (
        <MainLayout>
            <div className="w-full flex flex-col pl-20 mt-20 ">
                <div className="flex items-center space-x-4">
                    <h1 className="text-2xl text-grey-welcome font-bold">Transacciones</h1>
                    <p className="text-grey ml-2 text-grey-placeholder2 ">Todas las transacciones realizadas últimamente</p>
                </div>


                <div className="flex justify-center w-full mt-8 pr-12 space-x-8 ">
                    <div className="w-3/6  flex justify-center items-center shadow-xl rounded-3xl ">
                        <GraphyLine
                            title='Cantidad de ventas realizadas en la plataforma'
                            data={data2 && data2}
                            options={options2}
                            text='Total Venta'
                            value='$0'
                        />
                    </div>
                    <div className="w-3/6  flex justify-center items-center shadow-xl rounded-3xl ">
                        <GraphyLine
                            title='Cantidad de compras realizadas en la plataforma'
                            data={data3 && data3}
                            options={options3}
                            text='Total Compras'
                            value='$0'
                            className="ml-4"
                        />

                    </div>

                </div>

                <div className="flex justify-center w-full mt-4 pr-6 space-x-8 h-96">
                    <div className="w-2/6  flex justify-center items-center  shadow-xl rounded-3xl ">

                        <DoughnutGraphy
                            title='Cantidad de pagos en efectivo'
                            data={report && report?.data?.totals}
                            // options={options4}
                            text='Total pagos'
                            value='$0'
                        />

                    </div>
                    {/* <div className="w-2/6  flex justify-start items-start  ">
                        <Scale
                            className=" shadow-2xl rounded-xl"
                        />

                    </div> */}

                </div>

                {/* <div className="flex w-full mt-4 pr-4">
                <div className="w-3/6  flex justify-center items-center ">
                    <GraphyLine
                        title='Cantidad de pagos en efectivo'
                        data={data4}
                        options={options4}
                        // text='Total Revenue'
                        value='$600,000'
                    />
                </div>
                <div className="w-3/6  flex justify-center items-center ml-4 ">
                    <div className="w-3/6  border border-grey-bTab h-12">1</div>
                    <div className="w-3/6  border border-grey-bTab h-12 ml-2">2</div>
                </div>
            </div>

 */}





            </div>
        </MainLayout>
    )
}

export default metrics
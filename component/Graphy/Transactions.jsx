import React, { useState } from 'react'
import { Chart as ChartJS } from 'chart.js/auto'
import { Line, Chart } from 'react-chartjs-2';



import { data, options } from '../../utils/__data';
import { Icons } from '../../utils/icons';





const Transactions = ({ chart }) => {
    const [filter, setFilter] = useState(3);

    return (
        <div className="p-2 pb-6 border rounded-xl shadow-lg -my-2">

            <div className="flex flex-col ">
                <div className="px-4">
                    <h2 className="font-black text-xl  text-textFilter ">Resumen general</h2>

                </div>

                <div className="flex w-full text-black px-4 mt-4">

                    {/* <div className="mt-2 flex flex-col w-2/6 space-y-1">
                        <p className="text-xs  text-dataTable">Total de transacciones</p>
                        <p className="font-bold text-sm">15,236</p>
                        <p className="text-terminos font-semibold text-textDetail">89.5% of 20.000 Total</p>

                    </div>


                    <div className=" mt-2 w-2/6 space-y-1">
                        <p className="text-xs  text-dataTable">Total de transacciones</p>
                        <p className="font-bold text-sm">$753,098</p>
                        <p className="text-terminos  font-semibold text-textDetail">10.5% of 20.000 Total</p>

                    </div> */}
                    <div className="w-2/6 flex items-end justify-end flex-col space-y-1">
                        {/* <div className="w-28 rounded-full bg-filter text-textFilter py-2 px-4 flex space-x-1">
                            <p className="text-xs font-semibold">Julio 2022</p>
                            <p>{Icons.DownArrow}</p>
                        </div> */}
                        <div className="flex ">
                            {chart && chart.datasets.map((item) => {
                                return (
                                    <div className="flex justify-center items-center m-1 justify-center">
                                        <p
                                            style={{ backgroundColor: `${item.borderColor}` }}
                                            className="w-4 h-1 rounded-md mt-0 mr-1"></p>

                                        <p className="text-terminos font-semibold text-black ">{item.label}</p>
                                    </div>

                                )
                            })}
                        </div>

                    </div>


                </div>


            </div>




            <div className=" flex items-end ">
                {chart &&
                    <Line options={options} data={chart}

                    />
                }

            </div>

            {/* <canvas id="myChart"></canvas> */}
        </div >
    )
}

export default Transactions
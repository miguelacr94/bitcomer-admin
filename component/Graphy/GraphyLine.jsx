import React, { useState } from 'react'
import { Chart as ChartJS } from 'chart.js/auto'
import { Line, Chart } from 'react-chartjs-2';


const GraphyLine = ({ title, data, text, value, options,className }) => {


    const [filter, setFilter] = useState(3);

    return (
        <div className={`h-full p-6 w-full text-black ${className}`}>
            <div>
                <h2 className="font-black text-sm  ">{title}</h2>
                {/* <div className="flex">
                    <p className=" text-terminos w-3/6 font-semibold text-black">Filtrar por cualquier criterio</p>
                    <div className="w-3/6 flex justify-end pr-4 font-semibold">
                        <p className={`text-terminos px-2 text-black  ${filter === 1 ? 'bg-grey-bVerification' : ''}`}
                            onClick={() => setFilter(1)}>
                            <span>1D</span>
                        </p>

                        <p className={`text-terminos px-2  text-black ${filter === 2 ? 'bg-grey-bVerification' : ''}`}
                            onClick={() => setFilter(2)}>
                            <span>5D</span>

                        </p>
                        <p className={`text-terminos px-2  text-black ${filter === 3 ? 'bg-grey-bVerification' : ''}`}
                            onClick={() => setFilter(3)}
                        >
                            <span>1M</span>
                        </p>
                        <p className={`text-terminos px-2 text-black  ${filter === 4 ? 'bg-grey-bVerification' : ''}`}
                            onClick={() => setFilter(4)}
                        >
                            <span>1Y</span>
                        </p>
                        <p className={`text-terminos px-2 text-black ${filter === 5 ? 'bg-grey-bVerification' : ''}`}
                            onClick={() => setFilter(5)}
                        >
                            <span>MAX</span>
                        </p>
                    </div>
                </div> */}

            </div>

            <div className="flex">
                <div className="flex w-full">
                    <div>
                        <div className="mt-1">
                            {/* <p className="text-terminos">Total de transacciones</p> */}
                            <div className="flex flex-col">
                                <p className="text-terminos font-semibold">{text}</p>
                                <p className="font-bold text-sm">{value}</p>
                            </div>
                        </div>
                        <div className="w-2/6">

                        </div>
                    </div>


                </div>

                <div className="flex w-full flex justify-center items-center">
                    {data.datasets.map((item) => {
                        return (
                            <div className="flex justify-center items-center m-1 ">
                                <p
                                    style={{ backgroundColor: `${item.borderColor}` }}
                                    className="w-4 h-1 rounded-md mt-0 mr-1"></p>

                                <p className="text-terminos font-semibold ">{item.label}</p>
                            </div>

                        )
                    })}
                </div>
            </div>




            <div className=" flex items-end">
                <Line options={options} data={data}

                />
            </div>

            {/* <canvas id="myChart"></canvas> */}
        </div>
    )
}

export default GraphyLine
import React from 'react'
import { Icons } from '../../utils/icons'
import Input from '../Ui/Input'

const FilterDate = ({ allDay }) => {
    return (
        <div className="w-full flex justify-start items-center  ">

            <div className="h-8">
                <div className="flex bg-grey-bFilter justify-start items-center w-filter h-8 rounded-md">
                    <p className="border-r-2 border-grey-bTab p-1 text-blue-400 text-xs w-6">
                        {Icons.LeftArrow}
                    </p>

                    <div className="w-52 h-10 flex items-center px-2">
                        <p className="text-xs  text-black font-semibold w-2/6">27/07/2022</p>
                        <p className="mx-1 text-black w-2/6 text-center">-</p>
                        <p className="text-xs  text-black font-semibold w-2/6">27/07/2022</p>
                    
                    </div>

                    <p className="border-l-2 border-grey-bTab p-1 text-blue-400 text-xs w-6">
                        {Icons.RigthArrow}
                    </p>
                    
                </div>

            </div>
            {allDay ?
                <>
                    <div className="ml-2  flex justify-start">
                        <div className="flex bg-grey-fondo justify-center items-center px-4 py-1 rounded-sm">
                            <p className="text-xs text-grey font-semibold">All Day</p>
                            <p className="text-blue-400 text-xs ml-2">{Icons.DownArrow}</p>
                        </div>
                    </div>

                    {/* <a className="underline text-menu text-xs ml-4">Opciones avanzadas</a> */}
                </>
                : ''
            }
        </div>
    )
}

export default FilterDate
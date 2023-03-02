import React from 'react'
import { currencyFormat, myRound } from '../../utils/helpers';
import moment from 'moment';
import { Icons } from '../../utils/icons';

const TableAliado = ({ className, title, data }) => {




    return (
        <div className={` ${className}`}>

            <table className=" w-full mt-2 ">
                <thead>
                    <tr className=" text-grey-head  ">
                        {title.map((item, index) => {
                            return (
                                <th key={index} className="text-start h-8 pl-6 font-light text-sm">{item.name}</th>
                            )
                        })}

                    </tr>
                </thead>
                <tbody className="rowAlternate">

                    {
                        data && data?.map((d, index) => {


                            return (



                                <tr key={index} className="h-8 text-xs font-semibold  text-dataTable cursor-pointer">
                                    <td className="pl-6 ">{index + 1}</td>
                                    <td className="pl-6 ">{d?.name}</td>
                                    <td className="pl-6 ">{d?.country?.name}</td>
                                    <td className="pl-6 ">{d?.city?.name}</td>
                                    <td className="pl-6 "><div className='flex items-center space-x-1'>
                                        <p>{Icons.mail}</p>
                                        <p>{d?.email || d?.userId?.email}</p>
                                    </div>
                                    </td>
                                    <td className="pl-6 "> <div className='flex items-center space-x-1'>
                                        <p>{Icons.phone}</p>
                                        <p> {d?.phone}</p>
                                    </div></td>
                                    <td className="pl-6">
                                        <div className='flex items-center space-x-1'>
                                            <p>{Icons.calendar}</p>
                                            <p> {moment(d?.createdAt).format('L')}</p>
                                        </div>

                                    </td>


                                </tr>
                            )

                        })
                    }


                </tbody>
            </table>
        </div>
    )
}

export default TableAliado
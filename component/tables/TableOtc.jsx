import React from 'react'
import { capitalizer, currencyFormat, States } from '../../utils/helpers'
import { Icons } from '../../utils/icons'
import Pagination from '../Ui/Pagination'
import moment from 'moment';

const TableOtc = ({ onSelected, className, otc, datauser, pageSelect, totalPages, data }) => {



    const onPageChange = (e) => {

    }


    return (
        <div className={` ${className}`}>

            <table className=" w-full mt-2 ">
                <thead>
                    <tr className=" text-grey-head  ">
                        {otc.map((item, index) => {
                            return (
                                <th key={index} className="text-start h-8 pl-6 font-light text-sm">{item.name}</th>
                            )
                        })}

                    </tr>
                </thead>
                <tbody className="rowAlternate">

                    {
                        data && data?.map((d, index) => {

                            if (d?.purchaseType === 'otc') {
                                return (
                                    <tr key={index} onClick={() => onSelected(d)} className="h-8 text-xs font-semibold  text-dataTable cursor-pointer">
                                        <td className="pl-6 ">{index + 1}</td>
                                        <td className="pl-6 ">{d.code}</td>
                                        <td className="pl-6 capitalize">{capitalizer(d?.TransferType)}</td>
                                        <td className="pl-6 ">
                                            <div className='flex items-center space-x-2'>
                                                <p className={`w-5 h-5 rounded-full 
                                            ${States(d?.status)}
                                            `}></p>
                                                <p className='capitalized'>{d.status}</p>
                                            </div>
                                        </td>
                                        <td className="pl-6">
                                            <div className='flex items-center space-x-1'>
                                                <p>{Icons.calendar}</p>
                                                <p> {moment(d?.createdAt).format('L')}</p>
                                            </div>

                                        </td>
                                        <td className="pl-6">
                                            <div className='flex items-center space-x-1'>
                                                <img
                                                    src={d?.crypto?.cryptoId?.image}
                                                    className='w-5 h-5'
                                                />
                                                <p> {d?.crypto?.cryptoId?.code}</p>
                                            </div>


                                        </td>
                                        <td className="pl-6">{currencyFormat(d?.crypto?.quantity)}</td>
                                    </tr>
                                )
                            }
                        })
                    }


                </tbody>
            </table>
            {totalPages > 0 && (
                <Pagination totalPages={totalPages} onPageChange={onPageChange} />
            )}
        </div>
    )
}

export default TableOtc
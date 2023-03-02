import React, { useState } from 'react'
import { Icons } from '../../utils/icons';
import { capitalizer, StatesAlt } from '../../utils/helpers';
import Pagination from '../Ui/Pagination';
import moment from 'moment';

const TableUsers = ({ onSelect, className, user, datauser, pageSelect, totalPages, search }) => {

    const onPageChange = (data) => {
        pageSelect(data.selected + 1);
    };


    return (
        <div className={` ${className}`}>

            <table className=" w-full mt-2 ">
                <thead>
                    <tr className=" text-grey-head  ">
                        {user.map((item, index) => {
                            return (
                                <th className="text-start h-8 pl-6 font-light text-sm">{item.name}</th>
                            )
                        })}

                    </tr>
                </thead>
                <tbody className="rowAlternate">

                    {
                        datauser && datauser.map((data, index) => {
                            return (
                                <tr className="text-xs text-dataTable font-semibold border-b h-12 cursor-pointer"
                                    onClick={() => onSelect(data)}
                                >
                                    <td className="pl-6 font-semibold">#{index + 1}</td>
                                    <td className="pl-6 font-semibold ">

                                        <div className="flex space-x-3 items-center">
                                            <img
                                                src={data?.photo}
                                                className="w-5 h-5 rounded-full bg-grey"
                                            />
                                            <p>{capitalizer(data?.fullName)}</p>
                                        </div>

                                    </td>
                                    <td className="pl-6 font-semibold">

                                        <div className="flex space-x-3 items-center">
                                            <img
                                                src={data?.location?.country?.flag}
                                                className="w-5 h-5 rounded-full bg-white"
                                            />
                                            <p>{data?.location?.country?.name}</p>
                                        </div>
                                    </td>
                                    <td className="pl-6 font-semibold ">
                                        <div className="flex space-x-3 items-center">
                                            <p className="text-sm">{Icons.geo}</p>
                                            <p>{data?.location?.address ? capitalizer(data?.location?.address) : 'Sin dirección'}</p>
                                        </div>

                                    </td>
                                    <td className="pl-8 font-semibold ">
                                        <div className="flex space-x-3 items-center">

                                            {/* <p className={`w-4 h-4 rounded-full 
                                            ${data.userVerification?.account?.status == 'verified' ? 'bg-positive' :
                                                    data.userVerification?.account?.status == 'pending' ? 'bg-orange-400' :
                                                        data.userVerification?.account?.status == 'rejected' ? 'bg-red-500' :
                                                            data.userVerification?.account?.status == 'waiting' ? 'bg-yellow-400' :
                                                                ''}`}>

                                            </p> */}

                                            <p className={`w-4 h-4 rounded-full ${StatesAlt(data.userVerification?.account?.status)}`}></p>
                                            <p>{data && capitalizer(data.userVerification?.account?.status)}</p>
                                        </div>
                                    </td>
                                    <td className="pl-6 font-bold">
                                        <div className="flex space-x-3 items-center">
                                            <p className="text-sm">{data.typeUser === 'persona' ? Icons.user2 : Icons.maletin}</p>
                                            <p>{data && capitalizer(data?.typeUser)}</p>
                                        </div> </td>
                                    <td className="pl-6 font-bold">
                                        <div className="flex space-x-3 items-center">
                                            <p className="text-sm">
                                                {Icons.calendar}
                                            </p>
                                            <p>
                                                {moment(data?.createdAt).format('L')}
                                            </p>
                                        </div>


                                    </td>
                                </tr>
                            )
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

export default TableUsers
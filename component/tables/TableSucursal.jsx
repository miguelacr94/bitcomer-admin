import React, { useState } from 'react'
import { currencyFormat, myRound, toastTypes } from '../../utils/helpers';
import moment from 'moment';
import { Icons } from '../../utils/icons';
import { useContext } from 'react';
import { Context } from '../../providers/user/context';
import { useRouter } from 'next/router';
import { useToasts } from 'react-toast-notifications';
import { getDetailsSucursal } from '../../providers/api/sucursal.queries';
import { Checkbox } from '@material-ui/core';
const TableSucursal = ({ className, title, data, state }) => {


    const router = useRouter();
    const [total, setTotal] = useState(null);
    const { addToast } = useToasts();
    const [load, setLoad] = useState(null);
    const [query, setQuery] = useState(null);
    const [checked, setChecked] = useState(false);


    const getDetails = async (query) => {
        setLoad(true);
        const res = await getDetailsSucursal(query);
        if (res) {
            setTotal(res.data?.total);
            setQuery(query);
            setLoad(false);
        }
        else {
            addToast("Error al consultar total  ", {
                appearance: toastTypes.ERROR,
            });
            setLoad(false);
        }
    }







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



                                <tr key={index} className="h-10 text-xs font-semibold  text-dataTable cursor-pointer hover:bg-gray-300 ">
                                    <td className="pl-6 ">{index + 1}</td>
                                    <td className="pl-6 ">{d?.name}</td>
                                    <td className="pl-6 ">{d?.country?.name}</td>
                                    <td className="pl-6 ">{d?.city?.name}</td>
                                    <td className="pl-6 "><div className='flex items-center space-x-1'>
                                        <p>{Icons.mail}</p>
                                        <p>{d?.userId?.email}</p>
                                    </div>
                                    </td>

                                    <td className="pl-6">
                                        <div className='flex items-center space-x-1'>
                                            <p>{Icons.calendar}</p>
                                            <p> {moment(d?.createdAt).format('L')}</p>
                                        </div>

                                    </td>
                                    <td>
                                        <button
                                            disabled={load}
                                            onClick={() => getDetails(d?._id)}
                                            className='bg-menu px-6 h-8 text-white font-medium rounded-lg disabled:opacity-75'>
                                            {total !== null && query === d?._id ? '$' + total : 'Ver'}

                                        </button>
                                    </td>

                                    <td className='pl-8'>
                                        <Checkbox
                                            checked={d?.state}
                                            onChange={(e) => state(e.target.checked, d?._id)}
                                            color='primary'

                                        />
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

export default TableSucursal
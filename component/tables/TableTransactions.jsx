import React, { useEffect, useState } from 'react'
import { getTransactions } from '../../providers/api/transaction.queries';
import { Transaction, } from '../../utils/data'
import moment from 'moment';
import Pagination from '../Ui/Pagination';

import { capitalizer, currencyFormat, States } from '../../utils/helpers';
import { Icons } from '../../utils/icons';

const TableTransactions = ({ className, dataDetail, dataTransaction, search, country }) => {

    const [load, setLoad] = useState(false);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);


    const onPageChange = (data) => {
        setPage(data.selected + 1);
    };

    const getTransactionquery = async (data, country) => {

        const res = await getTransactions(page, data, country);
        if (res) {
            setData(res?.data?.docs);
            setTotalPages(res?.data?.totalPages);
        }

    }

    const getTransaction = async (data) => {

        const res = await getTransactions(page);
        if (res) {
            setData(res?.data?.docs);
            setTotalPages(res?.data?.totalPages);
        }

    }


    const getData = (e) => {
        if (e) {
            dataDetail(e);
        }
    }

    useEffect(() => {
        setData(dataTransaction);
    }, [dataTransaction]);


    useEffect(() => {
        getTransaction();
    }, [setData, setPage, page]);



    useEffect(() => {
        if (search || country) {
            getTransactionquery(search, country);
        }
        else {
            getTransaction();
        }

    }, [search, country]);

    // useEffect(() => {
    //     console.log(country);
    //     getTransaction(null, country);
    // }, [country])




    return (
        <div className={` ${className}`}>

            <table className=" w-full mt-6 h-64">
                <thead>
                    <tr className=" text-grey-head  ">
                        {Transaction.map((item, index) => {
                            return (
                                <th key={index} className="text-start h-8 pl-6 font-light text-sm">{item.name}</th>
                            )
                        })}

                    </tr>
                </thead>
                <tbody className="rowAlternate ">

                    {
                        data && data.map((data, index) => {
                            return (

                                <tr key={index} onClick={() => getData(data)} className="text-xs text-dataTable font-semibold border-b h-12 cursor-pointer" >
                                    <td className="pl-6 font-semibold">#{index + 1}</td>
                                    <td className="pl-6 font-semibold">{data?.code}</td>
                                    <td className="pl-6 font-semibold">
                                        <div className="flex space-x-3 items-center">
                                            <p className="text-sm">{data.purchaseType === 'compra' ? Icons.purchase : Icons.sale}</p>
                                            <p>{data && capitalizer(data?.purchaseType)}</p>
                                        </div>
                                    </td>
                                    <td className="pl-6 font-semibold">

                                        <div className="flex space-x-3 items-center">
                                            <img
                                                src={data?.userId?.photo}
                                                className="w-5 h-5 rounded-full bg-grey"
                                            />
                                            <p>{data && capitalizer(data?.userId?.fullName)}</p>
                                        </div>
                                    </td>
                                    <td className="pl-6 font-semibold">
                                        <div className="flex space-x-3 items-center">
                                            <p className={`w-4 h-4 rounded-full 
                                                  ${States(data?.status)}`}>
                                            </p>
                                            <p>{data && capitalizer(data?.status)}</p>
                                        </div>
                                    </td>
                                    <td className="pl-6 font-semibold">
                                        <div className="flex space-x-3 items-center">
                                            <p className="text-sm ">
                                                {Icons.calendar}
                                            </p>
                                            <p>
                                                {moment(data?.createdAt).format('L')}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="pl-6">{currencyFormat(data?.value)}</td>
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

export default TableTransactions
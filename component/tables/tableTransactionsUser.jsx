import React, { useState } from 'react'
import { TransactionUser, dataTransactionUser } from '../../utils/data'
import moment from 'moment';
import Pagination from '../Ui/Pagination';


const TableTransactionsUser = ({ className, transaction, totalPage, setPage, dataSelected }) => {

    const onPageChange = (data) => {
        setPage(data.selected + 1);
    };

    return (
        <div className={` p-4 mt-6  ${className}`}>
            <div className="w-full flex ">
            </div>
            <p className="text-black px-4  w-4/6 text-xs mt-6">Todas las transacciones realizadas últimamente</p>

            <table className=" w-full mt-2 ">
                <thead>
                    <tr className=" text-grey-head  ">
                        {TransactionUser.map((item, index) => {
                            return (
                                <th className="text-start h-8 pl-6 font-light text-xs">{item.name}</th>
                            )
                        })}

                    </tr>
                </thead>
                <tbody className="rowAlternate">

                    {
                        transaction && transaction.map((data, index) => {
                            return (
                                <tr key={index} onClick={() => dataSelected(data)} className="h-8 text-xs hover:bg-grey-bTab font-semibold cursor-pointer text-dataTable ">
                                    <td className="pl-6 ">{data.code}</td>
                                    <td className="pl-6">{data.purchaseType}</td>
                                    <td className="pl-6">{data.status}</td>
                                    <td className="pl-6">{moment(data?.createdAt).format('L')}</td>
                                    <td className="pl-6">{data.paymentMethod}</td>
                                    <td className="pl-6">${data.value}</td>
                                </tr>
                            )
                        })
                    }


                </tbody>
            </table>
            {totalPage > 0 && (
                <Pagination totalPages={totalPage} onPageChange={onPageChange} />
            )}
        </div>
    )
}

export default TableTransactionsUser
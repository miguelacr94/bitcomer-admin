import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { Orders, dataOrder } from '../../utils/data';

const Tables = ({
    names,
    items,
    head,
    data,
    className,


}) => {

   return (
        <div className={`${className} border border-grey-bTab p-4`}>
            <div className="w-full flex">
                <p className="text-black p-4 font-bold w-3/6 text-sm">{names}</p>
                <p className="text-menu px-8 py-4 font-bold w-3/6 text-end text-sm">{names}</p>
            </div>


            <table className=" w-full ">
                <thead>
                    <tr className="text-xs text-grey-bNav font-light ">
                        {head.map((item, index) => {
                            return (
                                <th className="text-start h-8">{item.name}</th>
                            )
                        })}

                    </tr>
                </thead>
                <tbody className="rowAlternate">

                    {
                        data.map((data, index) => {
                            return (
                                <tr className="h-8 text-xs ">
                                    {
                                        items.map((item, index) => {
                                            return (
                                                <>

                                                    <td>{data.codigo}</td>
                                                </>


                                            )
                                        })
                                    }

                                </tr>
                            )
                        })
                    }


                </tbody>
            </table>

        </div>
    )
}

export default Tables
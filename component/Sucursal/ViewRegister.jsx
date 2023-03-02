import React from 'react'
import { useState } from 'react'
import TableAliado from '../tables/TableAliado';
import TableSucursal from '../tables/TableSucursal';
import { aliado, branchs } from '../../utils/data';
import { changeStateSucursal, getBranch, getSocio } from '../../providers/api/list.queries';
import { useEffect } from 'react';

const ViewRegister = ({ aliados, branch, data }) => {
    const [tab, setTab] = useState(1);
    const [dataaliado, setAliado] = useState(null);
    const [databranch, setBranch] = useState(null);


    // useEffect(() => {
    //     getSucursal();
    // }, [setBranch]);

    const getAliados = async () => {
        const res = await getSocio();
        if (res) {
            setAliado(res.data);
        }
    }


    const getSucursal = async () => {
        const res = await getBranch();
        if (res) {
            setBranch(res.data);
        }
    }



    useEffect(() => {
        getAliados();
    }, [setAliado]);

    useEffect(() => {
        getSucursal();
    }, [setBranch]);



    const onChangeStateSucursal = async (state, id) => {
        const payload = {
            state: state
        }

        const res = await changeStateSucursal(payload, id);
        if (res) {
            const index = databranch.findIndex((t) => t._id == res?.data?._id);
            if (index != -1) {
                databranch[index] = res?.data;
                setBranch([...databranch]);
            }

        }

    }







    return (
        <div>

            <div className='flex space-x-4 underline mt-8'>
                <a onClick={() => setTab(1)} className={`${tab == 1 ? 'text-red-400' : 'text-menu'} cursor-pointer`}>Ver alidadas</a>
                <a onClick={() => setTab(2)} className={`${tab == 2 ? 'text-red-400' : 'text-menu'} cursor-pointer`}>Ver sucursales</a>
            </div>

            {tab === 1 &&

                <div>
                    <TableAliado
                        title={aliado}
                        data={dataaliado}
                    />
                </div>

            }

            {tab === 2 &&
                <div>
                    <TableSucursal
                        state={(state, id) => onChangeStateSucursal(state, id)}
                        title={branchs}
                        data={databranch}
                    />
                </div>
            }
        </div >
    )
}

export default ViewRegister
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { removeTarifeValue, sendTarifeValue, updateTarifeValue } from '../../providers/user/actions';
import InputAlt from '../Ui/InputAlt';
import { useToasts } from "react-toast-notifications";
import { toastTypes } from '../../utils/helpers';

const Formtarifa = ({ value, index, setIndex, data, currency, getRes, id }) => {

    const [form, setForm] = useState(null);
    const [_data, setData] = useState(null);
    const [load, setLoad] = useState(null);
    const { addToast } = useToasts();


    const senNewValue = async (e,) => {

        e.preventDefault();


        // if (form?.init >= form?.end) {
        //     return addToast("El valor inicial debe ser inferior al valor final", {
        //         appearance: toastTypes.WARNING,
        //     });
        // }
        if (!data) { // update value, where data 
            const payload = {
                init: parseInt(form?.init),
                end: parseInt(form?.end),
                currency: currency,
                percentage: parseInt(form?.percentage)
            }
            const res = await sendTarifeValue(payload);
           

            if (res?.response?.data?.data === 802) {
                setLoad(false);
                return addToast("El valor inicial debe ser superior a los valores finales", {
                    appearance: toastTypes.WARNING,
                });
            }
            else if (res) {
               
                setForm('');
                getRes();
            }

        } else {
            const payload = {   // save new value where data its null or undefined
                init: parseInt(form?.init) || parseInt(data?.init),
                end: parseInt(form?.end) || parseInt(data?.init),
                currency: currency,
                percentage: parseInt(form?.percentage) || parseInt(data?.percentage),
                id: data?._id
            }
            const res = await updateTarifeValue(payload, data?._id);
            if (res) {
                
                setForm('');
                getRes();
            }
        }
    }



    const removeTarife = async (e) => { // remove item value 
        e.preventDefault();
        const res = await removeTarifeValue(data?._id);
        if (res) {
            getRes();
        }
    }


    useEffect(() => {
        setForm(data);
    }, [data]);



    return (
        <div className='mt-4'>
            <div className='flex space-x-4 items-end'>
                <div className='space-y-2'>
                    {/* <p className='font-semibold text-grey text-md'>Valor Inicial</p>

                    <input className='border border-grey w-40 h-11 rounded-xl text-center'
                        id='init'
                        name='init'
                        value={form && form?.init}
                        // defaultValue={form && form?.init || data?.init}
                        onChange={(e) => setForm({ ...form, init: e.target.value })}

                    /> */}

                    <InputAlt
                        id='end'
                        name='end'
                        value={form && form?.init}
                        onChange={(e) => setForm({ ...form, init: e.target.value })}
                        // mask='9999999999'
                        label='Valor inicial'
                        max={10}
                    />



                </div>

                <div className='space-y-2'>

                    <InputAlt
                        nit='end'
                        name='end'
                        value={form && form?.end}
                        // defaultValue={form?.end || data?.end}
                        onChange={(e) => setForm({ ...form, end: e.target.value })}
                        max={10}
                        label='Valor final'
                        // mask='9999999999'
                    />


                </div>
                <div className='space-y-2 flex flex-col justify-center items-center'>

                    <InputAlt
                        id='percentage'
                        name='percentage'
                        value={form && form?.percentage}
                        // defaultValue={form?.percentage || data?.percentage}
                        onChange={(e) => setForm({ ...form, percentage: e.target.value })}
                        // mask='999'
                        max={3}
                        label='Porcentaje'

                    />


                </div>
                <div className='flex justify-center items-center space-x-3'>
                    <button
                        // disabled={
                        //     form?.init == data?.init ||
                        //     form?.end == data?.end ||
                        //     form?.percentage == data?.percentage
                        // }
                        onClick={senNewValue}
                        // disabled={
                        //     // !form?.init ||
                        //     // !form?.end ||
                        //     // !form?.percentage
                        // }
                        className='w-10 disabled:opacity-75 h-10 bg-menu rounded-xl text-white'>
                        ok
                    </button>

                    <button
                        onClick={removeTarife}
                        className='w-10 h-10 bg-red-400 rounded-xl text-white '>
                        x
                    </button>

                </div>
            </div>
        </div >
    )
}

export default Formtarifa
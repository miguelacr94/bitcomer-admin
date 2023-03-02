import React, { useState } from 'react'
import { useEffect } from 'react';
import Formtarifa from '../Form/Formtarifa';

const ValueTarifa = ({ rates, getRes }) => {

    const [items, setItems] = useState([]);
    const [itemsCop, setItemsCop] = useState([1]);
    const [showUsd, setShowUsd] = useState(false);
    const [showCop, setShowCop] = useState(false);

    const addNewItem = () => {
        // const items = items.push(item + 1);
        // const obj = [...items];

        // console.log(obj);
        // // obj.push(items.length + 1);
        // // setItems([...obj]);

        setShowUsd(true);
    }

    const addNewItemCop = () => {
        // const obj = [...itemsCop];
        // obj.push(itemsCop.length + 1);
        // setItemsCop(obj);
        setShowCop(true);
    }

    const deleteItems = (i) => {

        const obj = [...itemsCop];
        obj.indexOf(i);
        setItemsCop(obj);



        // console.log(arreglo);
    }

    useEffect(() => {
        const filter = rates.filter((r) => r.currency == 'USD');

        setItems(filter);
    }, [setItems, rates]);

    // useEffect(() => {
    //   items.map(i => console.log(i.configs))
    // }, [items])


    useEffect(() => {
        const filter = rates.filter((r) => r?.currency == 'COP');
        setItemsCop(filter);
    }, [setItemsCop, rates]);


    const onShowNewForm = () => {
        setShowUsd(false);
        getRes();
    }

    const onShowNewFormCop = () => {
        setShowCop(false);
        getRes();
    }

    // console.log(items?.configs);
    // console.log(items)

    return (
        <div className="w-full flex flex-col mt-12 overflow-auto pb-12">
            <span className="flex space-x-2 items-center">
                <i className="bg-menu w-2 h-2 rounded-full" />
                <p className="text-black text-terminos font-semibold">Tarifas de giros</p>

            </span>

            <div className='flex w-full space-x-6 mt-4'>
                <div className='w-3/6 border rounded-xl p-4 '>

                    <h1 className='text-menu font-semibold '>tarifas en dólar</h1>

                    {items.map((item, index) => (
                        <>   <div>
                            {
                                item?.configs?.map((config, key) => (
                                    <Formtarifa
                                        index={key}
                                        setIndex={(e) => deleteItems(e)}
                                        data={config}
                                        currency={item.currency}
                                        getRes={getRes}
                                    />
                                ))
                            }


                        </div>


                        </>
                    ))}
                    {showUsd &&
                        <Formtarifa
                            currency={'USD'}
                            getRes={onShowNewForm}
                            data={''}
                        />
                    }
                    <button disabled={showUsd} onClick={addNewItem} className='mt-4 disabled:opacity-75 bg-menu w-10 h-10 rounded-2xl text-white font-semibold'>+</button>
                </div>
                <div className='w-3/6 border rounded-xl p-4 '>

                    <h1 className='text-menu font-semibold'>tarifas en peso colombiano</h1>

                    {itemsCop.map((item, index) => (
                        <>  <div>
                            {
                                item?.configs?.map((config, key) => (
                                    <Formtarifa
                                        index={key}
                                        setIndex={(e) => deleteItems(e)}
                                        data={config}
                                        currency={item.currency}
                                        getRes={getRes}

                                    />

                                ))
                            }
                        </div>
                        </>
                    ))}
                    {showCop &&
                        <Formtarifa
                            currency={'COP'}
                            getRes={onShowNewFormCop}
                            data={''}
                        />
                    }
                    <button disabled={showCop} onClick={addNewItemCop} className='mt-4 bg-menu w-10 h-10 rounded-2xl text-white font-semibold'>+</button>
                </div>

            </div>



        </div>
    )
}

export default ValueTarifa
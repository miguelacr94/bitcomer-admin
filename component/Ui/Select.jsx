import React, { useEffect, useState } from 'react'
import { Icons } from '../../utils/icons'

const Select = ({
    id,
    className,
    items,
    placeholder,
    onChange,
    register,
    label,
    value,
    defaultValue,
    border,
    icon,
    colorLabel,
    disabled,
    errors,
    hint,
    width,
    search,
    px

}) => {


    const [show, setShow] = useState(false);
    const [itemState, setItem] = useState(null);
    const [filterText] = useState(null);



    useEffect(() => {
        document.addEventListener('click', function (event) {
            if (event.target.localName === 'svg') {
            } else if (event?.target?.id !== id) {
                setTimeout(() => {
                    setShow(false);
                }, 100);
            }
        });

    });

    const filter = (event) => {  //filtra loas países por medio de buscador 
        var text = event.target.value
        const data = items
        const newData = data.filter(function (item) {
            const itemDataTitle = item.toUpperCase()
            const campo = itemDataTitle
            const textData = text.toUpperCase()
            return campo.indexOf(textData) > -1
        })
        setItem(newData);

    }
    useEffect(() => {
        setItem(items)
    }, [items])



    return (
        <div className="relative w-full lg:cursor-pointer outline-none" >
            <div id={id} className="mt-3">
                <label className={`text-md font-semibold ${colorLabel} `}>{label}</label>
                <div id={id} onClick={() => setShow(true)}
                    className={`${className} ${errors ? 'border-red-300' : 'border-grey-bInput'} rounded-full p-2 pl-2 h-10  border border-grey-bInput flex justify-center items-center mt-1`}>
                    {icon &&
                        <img
                            className="w-4 h-4"
                            src={icon}
                        />
                    }

                    <p
                        id={id}
                        className="pl-1 ml-1 mt-1 w-full text-black outline-none bg-transparent placeholder:text-sm placeholder:text-grey text-sm  
                    text-grey font-light"
                    >{value ? value : 'Seleccione ' + placeholder}</p>
                    <input
                        id={id}
                        className="pl-1 hidden w-full outline-none bg-transparent placeholder:text-xs placeholder:text-grey text-xs text-blackText"
                        placeholder={placeholder}
                        readonly="readonly"
                        value={value}
                        defaultValue={defaultValue}
                        onChange={onChange}
                    />
                    <i className="text-grey-arrow">{Icons.DownArrow}</i>
                </div>
                <p className='text-xs text-red-400 ml-2 absolute'>{hint}</p>
            </div>
            {
                show &&

                <div className={`${width}  bg-white absolute z-10 mt-2 ${search ? 'h-52' : 'max-h-48 p-2 overflow-auto'}   rounded-lg shadow-2xl transition ease-in-out duration-300  px-${px}  py-2`}>
                    {search &&
                        <div className='flex border justify-center items-center'>
                            <input id='filter'
                                className="w-11/12 h-12 pl-3 text-sm bg-white text-grey-light"
                                placeholder='Buscar...'
                                value={filterText} onChange={(text) => filter(text)} />
                            <p className='w-1/12 text-grey-light'>{Icons.search}</p>
                        </div>
                    }
                    <div className={`${search ? 'overflow-auto h-36 py-1' : 'max-h-36 mb-1 mt-2  '} `}>
                        {
                            (itemState && itemState.map((e, i) => {
                                return (

                                    <div onClick={() => onChange(e)} key={i} className="hover:bg-Option overflow-auto rounded-md cursor-pointer  w-full flex justify-start items-center px-2"  >
                                        <a
                                            type="button"

                                            className="flex  h-8  items-center justify-start  text-sm text-black font-semibold space-x-2 px-2"
                                        >
                                            {
                                                e?.image && <img
                                                    src={e.image}
                                                    className="W-4 h-4"
                                                />
                                            }
                                            <p className="mt-1">{e}</p>
                                        </a>
                                    </div>

                                );
                            })

                            )}
                    </div>
                </div>


            }
        </div >

    )
}

export default Select
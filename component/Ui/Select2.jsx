import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { capitalizer } from '../../utils/helpers';
import { Icons } from '../../utils/icons';

const Select2 = ({
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
    hint,
    errors,
    width,
    px,
    disabled
}) => {

    const [show, setShow] = useState(false);

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


    return (
        <div className="relative w-full lg:cursor-pointer outline-none" >
            <div id={id} className="mt-3 pt-1">
                <label className={`text-md font-semibold  ${colorLabel} `}>{label}</label>
                <div id={id} onClick={disabled ? '' : () => setShow(true)} className={`${className} ${disabled ?  'cursor-not-allowed' : ''} ${errors ? 'border-red-300' : 'border-grey-bInput'} rounded-full p-2.5 pl-4 h-10  border border-grey-bInput flex justify-center items-center mt-1`}>
                    {icon &&
                        <img
                            className="w-4 h-4"
                            src={icon}
                        />
                    }

                    <p
                        id={id}
                        className="pl-1 ml-1 mt-1 w-full outline-none bg-transparent placeholder:text-xs placeholder:text-grey text-sm  text-grey font-light"
                    >{value ? capitalizer(value) : 'Seleccione ' + placeholder}</p>




                    <input
                        id={id}
                        className="pl-3 hidden w-full outline-none bg-transparent placeholder:text-xs placeholder:text-grey text-xs text-blackText"
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

                <div className={`${width}  bg-white absolute z-10 mt-2 max-h-64 overflow-auto rounded-lg shadow-2xl transition ease-in-out duration-300  px-${px}  py-2`}>

                    {


                        (items && items.map((e, i) => {
                            return (

                                <div onClick={() => onChange(e)} key={i} className="hover:bg-Option rounded-md cursor-pointer  w-full flex justify-start items-center px-2"  >
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
                                        <p className="mt-1">{e && capitalizer(e.name)}</p>
                                    </a>
                                </div>

                            );
                        })

                        )}




                </div>


            }
        </div >
    )
}

export default Select2
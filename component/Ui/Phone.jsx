import React, { useContext, useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import { Context } from '../../providers/user/context';


const Phone = ({
    className,
    id,
    placeholder,
    onChange,
    type,
    label,
    value,
    defaultValue,
    border,
    errors,
    hint,
    control,
    register,
    name,
    valuePhone,
    code,
    valueCode,
}) => {


    const { country } = useContext(Context);
    const [showMenu, setShowMenu] = useState(false);

       useEffect(() => {
        document.addEventListener('click', function (event) {
            if (event.target.localName === 'svg') {
            } else if (event?.target?.id !== 'myMenu') {
                setTimeout(() => {
                    setShowMenu(false);
                }, 100);
            }
        });

    });



    return (

        <>
            {register && (
                < div className="mt-4 w-full" >
                    <label className=" text-sm font-semibold text-black">{label}</label>
                    <div
                        className={`${errors ? 'border-red-300' : 'border-grey-bInput'}
                          ${className} rounded-full p-2.5 h-10  border  flex justify-center items-center mt-1 
                        ${border ? border : ''} `}>
                        <Controller
                            name={name}
                            control={control}
                            defaultValue={defaultValue}
                            render={({ field: { } }) => (

                                <input
                                    {...register(id)}
                                    id={id}
                                    name={name}
                                    placeholder={placeholder}
                                    type={type}
                                    className="w-full pl-2 outline-none bg-transparent placeholder:text-xs placeholder:text-black text-xs text-black font-light"
                                    value={value}
                                    defaultValue={defaultValue}
                                    onChange={onChange}
                                    control={control}
                                />


                            )}


                        />
                        <div className="w-10 ">
                            {/* <input
                                id="myMenu"
                                value={valueCode}
                                className="w-8 border border-menu rounded-xl outline-none h-6 cursor-pointer text-center text-xs"
                                readonly="readonly"
                                onClick={() => setShowMenu(!showMenu)}
                            /> */}

                            <div
                                id="myMenu"
                                className="w-4 h-4 rounded-full overflow-hidden cursor-pointer"
                                onClick={() => setShowMenu(!showMenu)}
                            >
                                {

                                    country && country.map((c) => {
                                        if (c.code === valueCode || c.code === valueCode?.code) {
                                            return (

                                                <img
                                                    id="myMenu"
                                                    className="w-full h-full"
                                                    src={c.flag} >

                                                </img>

                                            )
                                        }
                                    })

                                }

                            </div>
                            {showMenu &&
                                <div className="bg-white w-8 h-24 shadow-lg rounded-md mt-3 absolute flex flex-col space-y-2 overflow-auto  py-3 border ">
                                    {
                                        country.map((c) => {
                                            return (
                                                <a
                                                    onClick={() => code(c)}
                                                    className="hover:bg-Option cursor-pointer text-sm  w-full flex flex-col items-center"
                                                >
                                                    <img
                                                        className="w-4 h-4 rounded-full"
                                                        src={c.flag}
                                                    />
                                                </a>


                                            )
                                        })
                                    }

                                </div>
                            }
                        </div>


                    </div>
                </div >
            )}

            <div></div>

        </>
    )
}

export default Phone
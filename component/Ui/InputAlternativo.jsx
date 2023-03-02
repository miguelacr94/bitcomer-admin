import React, { useState } from 'react'
import { Controller } from 'react-hook-form'

const InputAlternativo = ({ label, id, name, onChange, className, onClick, onBlur, type, register, errors, placeholder, defaultValue, value, control, hint }) => {

    const [focus, setFocus] = useState(0);

    return (
        <>

            {register && (
                <>
                    <div className={`  flex 
                    flex-col  justify-start items-start shadow-sm  w-full  rounded-xl p-2`}>

                        <label className="font-medium text-white text-sm ml-4">{label}</label>

                        <Controller
                            name={name}
                            control={control}
                            defaultValue={defaultValue}
                            render={({ field: { } }) => (


                                <input
                                    {...register(id)}
                                    id={id}

                                    type={type}
                                    name={name}
                                    onChange={onChange}
                                    value={value}
                                    defaultValue={defaultValue}
                                    placeholder={placeholder}
                                    className="w-full h-11 rounded-full pl-4  
                                     outline-none text-xs mt-2 text-register bg-input
                                     placeholder:text-grey-placeholder2 placeholder:text-md font-semibold text-white"
                                    // onClick={() => setFocus(1)}
                                    // onBlur={() => setFocus(0)}
                                    control={control}
                                />

                            )}


                        />
                    </div>
                    <p className="text-xs text-red-400 text-start w-full ml-12 mt- ">{hint}</p>
                </>
            )}


            {/* {
                !register && (
                    <div className={` ${focus === 1 ? 'border-red-400' : ''}  flex flex-col justify-start items-start shadow-sm border focus:border-red-300 rounded-xl p-2`}>
                        <label className="font-semibold text-grey text-sm">{label}</label>
                        <input

                            id={id}
                            type={type}
                            name={name}
                            onChange={onChange}
                            value={value}
                            defaultValue={defaultValue}
                            className="w-80 h-4  outline-none text-xs mt-1 text-register"
                            onClick={() => setFocus(1)}
                            onBlur={() => setFocus(0)}
                            control={control}
                        />
                    </div>

                )
            } */}
        </>
    )
}

export default InputAlternativo
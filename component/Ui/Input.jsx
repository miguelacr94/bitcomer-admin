import React from 'react'
import { Controller } from 'react-hook-form'

const Input = ({
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
    readonly,
    required,
    onKeyup,
    colorLabel,
    icon,
    onKey
}) => {




    return (
        <>
            {register && (
                < div className="mt-4 w-full" >
                    <label className={`text-md font-semibold  ${colorLabel}`}>{label}</label>
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
                                    required={required}
                                    placeholder={placeholder}
                                    type={type}
                                    className="w-full pl-2 outline-none bg-transparent placeholder:text-sm placeholder:text-black text-sm text-black font-light"
                                    value={value}
                                    defaultValue={defaultValue}
                                    onChange={onChange}
                                    control={control}
                                    onKeyup={onKeyup}
                                    onKeyDown={onKey}

                                />
                            )}


                        />

                        {
                            icon &&
                            <p className='text-lg w-8 h-8 cursor-pointer bg-menu text-white flex justify-center items-center rounded-full'>{icon}</p>

                        }
                    </div>
                    <p className='text-xs text-red-400 ml-2 absolute'>{hint}</p>
                </div >
            )}
        </>
    )
}

export default Input
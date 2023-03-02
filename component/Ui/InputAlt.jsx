import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import InputMask from 'react-input-mask';

const InputAlt = ({ label, id, name, onChange, className, errors, placeholder, defaultValue, value, control, hint, mask, maskChar, colorLabel, border, signo, formatChars, type }) => {

    const [focus, setFocus] = useState(0);

    return (
        <>

            < div className="mt-4 w-full" >
                <label className={`text-md font-semibold ${colorLabel} `}>{label}</label>
                <div
                    className={`${errors ? 'border-red-300' : 'border-grey-bInput'}
                      ${className} rounded-full p-2.5  h-10 border  flex justify-center items-center mt-1 
                    ${border ? border : ''} relative`}>
                    <p className="text-grey-light ml-3 absolute left-0">{signo}</p>
                    <InputMask
                        id={id}
                        name={name}
                        mask={mask}
                        value={value}
                        defaultValue={defaultValue}
                        onChange={onChange}
                        placeholder={placeholder}
                        className={`w-full ${signo ? 'pl-4' : 'pl-2'} outline-none bg-transparent placeholder:text-sm placeholder:text-black text-md text-grey font-light`}
                        // value={props.value}
                        // onChange={}
                        type={type}
                        formatChars={formatChars}
                        maskChar={''}
                    >
                    </InputMask>

                </div>
                <p className='text-xs text-red-400 ml-2 absolute'>{hint}</p>
            </div >

        </>
    )
}

export default InputAlt
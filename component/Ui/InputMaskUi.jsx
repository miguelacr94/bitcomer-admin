import React from 'react'
import InputMask from 'react-input-mask';

const InputMaskUi = (
    {
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
        max,
        mask,
        formatChars,
        signo

    }
) => {
    return (
        <>

            < div className="mt-4 w-full" >
                <label className={`text-md font-semibold ${colorLabel} `}>{label}</label>
                <div
                    className={`${errors ? 'border-red-300' : 'border-grey-bInput'}
                      ${className} rounded-full p-2 h-11 border  flex justify-center items-center mt-1 
                    ${border ? border : ''} relative`}>
                    <p className="text-grey-light ml-3 absolute left-0">{signo}</p>
                    <InputMask
                        id={id}
                        name={name}
                        mask={mask}
                        value={value}
                        defaultValue={defaultValue}
                        onChange={onChange}
                        className={`w-full ${signo ? 'pl-4' : 'pl-2'} outline-none bg-transparent placeholder:text-xs placeholder:text-black text-md text-grey-light font-light`}
                        // value={props.value}
                        // onChange={}
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

export default InputMaskUi
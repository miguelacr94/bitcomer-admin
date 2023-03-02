import React from 'react'

const Button = ({
    text,
    className,
    onClick,

}) => {
    return (
        <button
            onClick={onClick}
            className={`${className} text-white rounded-sm text-xs h-8 cursor-pointer `  }
        >
            {text}
        </button>
    )
}

export default Button
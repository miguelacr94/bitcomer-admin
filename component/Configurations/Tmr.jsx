import React from 'react'

const Tmr = () => {
  return (
    <div className="flex w-64 flex-col  bg-darkBlue justify-center items-center w-full rounded-xl shadow-xl text-black  px-4  h-24 ">
            <div className="h-3/6 w-full flex justify-start items-end">
                <h1 className="text-xl text-white font-bold">4,625</h1>
            </div>
            <div className="flex items-start  h-3/6 w-full text-white">
                <div className="w-3/6 flex items-start">
                    <p className=" left-0 font-normal">TRM Actual</p>
                </div>
                <div className="w-3/6  flex items-start justify-end">
                    <a className="underline w-3/6 right-0 text-sm cursor-pointer">Cambiar</a>
                </div>
            </div>
        </div>
  )
}

export default Tmr
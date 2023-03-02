import React from 'react'
import { items1, Items2 } from '../../utils/data'

const Items = () => {
    return (
        <div>
            <div className="flex ">
                {items1.map((item, index) => {
                    return (
                        <div className={`${item.className} w-64 h-20  flex flex-col justify-center items-center px-4 py-4 text-white`}
                            style={{ background: `${item.color}` }}

                        >
                            <div className="w-full flex flex-col h-full h-3/6">
                                <h2 className="font-bold text-xl">{item.valor}</h2>

                            </div>
                            <div className="flex justify-center items-center  w-full h-3/6">
                                <p className="w-3/6 text-sm text-start">{item.text}</p>
                                <a className="underline w-3/6 text-xs text-end">Cambiar</a>
                            </div>
                        </div>

                    )
                })

                }

                <div>
                </div>
            </div>

        </div >
    )
}

export default Items
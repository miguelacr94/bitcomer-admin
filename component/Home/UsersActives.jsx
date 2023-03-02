import React from 'react'
import { UserActives } from '../../utils/data'

const UsersActives = () => {
    return (
        <div>
            <h2 className=" font-semibold text-xs">Usuarios más activos</h2>
            <div className="mt-1 flex space-x-1">
                {
                    UserActives.map((user, index) => {
                        return (
                            <div className="flex flex-col justify-center items-center">
                                <div className="w-11 h-11 bg-white rounded-full border m-1 overflow-hidden">
                                    <img
                                        src={user.image}
                                        className="w-full h-full"
                                    />
                                </div>
                                <p className="text-userActive text-grey-bNav">{user.name}</p>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default UsersActives
import React, { useContext } from 'react'
import { Context } from '../../providers/user/context';

const Avatar = () => {

    const { user, setUser } = useContext(Context);

    return (
        <div className="w-5/6 h-14  rounded-sm flex justify-start items-center p-1 px-2">
            <div className="w-12 h-12 rounded-full  mr-2 flex justify-center items-center overflow-hidden">
                <img
                    src={user?.photo ? `${user?.photo}?time=${Date.now()}` : ''}
                    className="w-full h-full"
                />
                <i className={
                    `bg-green-400
                 w-2 h-2 rounded-full absolute ml-8 mt-8`}></i>
            </div>
            <div className="text-white flex flex-col ">
                <p className="text-sm text-white font-semibold">{user?.fullName}</p>
            </div>
        </div >
    )
}

export default Avatar
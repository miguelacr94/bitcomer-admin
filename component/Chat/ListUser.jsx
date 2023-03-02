import React, { useEffect, useState } from 'react'
import useSocketIO from '../../utils/hoocks/useSocketIO';
import { Icons } from '../../utils/icons'
import { capitalizer } from '../../utils/helpers'

const ListUser = ({ listUser, userSelected, userUpdate }) => {


    const [userList, setUserList] = useState([]);
    const [userSelect, setUserSelect] = useState(null);

    const onUpdateValue = (data) => {
        const newState = userList?.filter((u) => u._id !== data?._id);
        const obj = [...newState]
        obj.unshift(data)
        setUserList(obj);
    }

    useEffect(() => {
        setUserList(listUser);
    }, [setUserList, listUser]);

    const { chatContent } = useSocketIO();

    useEffect(() => {
        if (chatContent) {
            onUpdateValue(chatContent);
        }
    }, [chatContent]);



    const onUserSelected = (e) => {
        userSelected(e);
        setUserSelect(e);
    }

    return (
        <div className="w-full shadow-xl ">
            <div className="flex items-center bg-white px-2  text-grey">
                <div className="w-full h-12 outline-none bg-white text-sm rounded-lg placeholder:pl-2 flex items-center overflow-hidden">
                    <input
                        placeholder="buscar usuario"
                        className="w-11/12 h-full outline-none placeholder:pl-2 bg-white" />
                    <p>{Icons.search}</p>
                </div>

            </div>
            <div className="w-full space-y-1 mt-1 h-full overflow-auto border-r border-grey-selected ">
                <hr className="h-0.5 bg-grey-bTab" />
                <div className="flex w-full flex-col overflow-auto  overflow-x-hidden ">
                    {

                        userList && userList?.map((u, index) => {
                            return (
                                <>
                                    <div key={index} onClick={() => onUserSelected(u)}
                                        className={` ${userSelect?._id == u?._id ? 'bg-grey-selected ' : 'bg-white'} 
                             w-full space-x-4 px-2 w-full h-20 text-menu  flex 
                             items-center justify-start cursor-pointer relative overflow-hidden`}>
                                        <p className={`h-6 w-6 absolute ml-12 -mt-10 shadow-xl ${u?.quantity <= 0 ? 'bg-grey-bNav text-white' : 'bg-menu text-white'}  text-xs rounded-full items-center justify-center flex`}>{u?.quantity}</p>
                                        <img className="w-12 h-12 rounded-full"
                                            src={u?.user?.photo}

                                        />
                                        <div className="w-4/6">
                                            <p className="font-semibold">{u?.user?.fullName && capitalizer(u?.user?.fullName)}</p>
                                            <p className="text-xs">{u?.message?.content}</p>
                                        </div>
                                    </div>
                                    <hr className="h-line bg-grey-bTab opacity-75" />
                                </>
                            )
                        })

                    }
                </div>

            </div>

        </div>
    )
}

export default ListUser
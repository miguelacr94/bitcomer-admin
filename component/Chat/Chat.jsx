import React, { useEffect, useState } from 'react'
import { getAllChat, getSelectedChat, viewUpdate } from '../../providers/user/actions'
import useSocketIO from '../../utils/hoocks/useSocketIO'
import ListUser from './ListUser'
import PanelChat from './PanelChat'

const Chat = () => {

    const [ChatState, setChat] = useState([]);
    const [listU, setlistU] = useState(null);
    const [userSelected, setUserSelected] = useState(null);
    const [userUpdate, setUserUpdate] = useState(null);
    const { chat } = useSocketIO();

    const getChat = async () => {
        const res = await getAllChat();
        if (res) {
            setChat(res);
            setlistU(res?.data?.docs);
        }
    }

    useEffect(() => {
        getChat();
    }, [setChat]);

    const selectedUser = async (data) => {
        const res = await getSelectedChat(data?.user?._id);
        if (res) {
            setUserUpdate(res.data.chatInfo)
            const newArr = (res.data.messages.docs)
            newArr.reverse();
            setUserSelected(newArr);
        }
        const resp = await viewUpdate(data._id);
        if (resp) {
        }
    }



    useEffect(() => {
        if (chat) {
            newMessage(chat);

        }
    }, [chat])


    const newMessage = (data) => {
        if (data?.chatId) {
            const obj = [...userSelected];
            obj.push(data);
            setUserSelected(obj);
        }
    };

    return (
        <div className="w-11/12 h-chat  mt-4 flex border rounded-lg shadow-2xl rounded-xl overflow-hidden bg-grey-selected">
            <div className="w-2/6 border overflow-auto">
                <ListUser
                    chat={ChatState}
                    listUser={listU}
                    userSelected={(data) => selectedUser(data)}
                    userUpdate={userUpdate}
                />
            </div>
            <div className="w-4/6 h-full">
                <PanelChat
                    user={userUpdate}
                    chat={userSelected && userSelected}
                    resp={(e) => newMessage(e)}
                />
            </div>
        </div>

    )
}

export default Chat
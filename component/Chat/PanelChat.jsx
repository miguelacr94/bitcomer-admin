import React, { useState } from 'react';
import { sendMessage } from '../../providers/user/actions';
import { viewFormData, toastTypes } from '../../utils/helpers';
import { Icons } from '../../utils/icons';
import MessagePlanel from './MessagePlanel';
import { useToasts } from "react-toast-notifications";

const PanelChat = ({ chat, user, resp }) => {
    const { addToast } = useToasts();

    const [fileSelected, setFile] = useState(null);
    const [message, setMessage] = useState(null);

    const handleImageClick = () => {
        document.querySelector('#image-profile').click(); //selecciona input file
    }

    const handleChangefile = (data) => { //cambiar imagen
        if (data) {
            const file = data.target.files[0];
            setFile(file);
        }
    }

    const sendMessageUser = async (e) => {
        e.preventDefault();
        const payload = new FormData();

        if (fileSelected?.name) {
            payload.append("send", 2);
            payload.append("user", user.user._id);
            payload.append("admin", user.admin._id);
            payload.append("image", fileSelected)

        } else {
            payload.append("content", message);
            payload.append("contentType", 1);
            payload.append("send", 2);
            payload.append("user", user.user._id);
            payload.append("admin", user.admin._id);
        }
        viewFormData(payload);
        const res = await sendMessage(payload);
        if (res) {
            resp(res.data);
            setMessage('');
            setFile('');
            return document.getElementById("message").focus(); // lleva puntero a input 
        } else {
            addToast("Error al enviar mensaje", {
                appearance: toastTypes.ERROR,
            });
            return document.getElementById("message").focus();

        }
    }

    return (
        <div className="w-full h-full ">
            <div className="w-full h-14  flex items-center justify-start px-12 space-x-2 border-b-3 border" >
                {user ?
                    <>
                        <img
                            src={user?.user?.photo}
                            className="w-12 h-12 rounded-full"
                        />
                        <p className="text-menu font-semibold">{user?.user?.fullName}</p>
                    </>
                    :
                    <h1 className="font-semibold text-menu">Chat</h1>
                }
            </div>

            <div className={`w-full ${fileSelected?.name ? 'h-4/6' : 'h-panelMessage'}`}>
                <MessagePlanel
                    message={chat}
                    user={user}
                />
            </div>
            {user &&
                <form autoComplete='off'>
                    <div className={`${fileSelected?.name ? 'h-40' : 'h-12'} w-full px-3  flex items-center justify-start space-x-2 bg-white mt-1 `}>

                        {fileSelected && fileSelected?.name ?

                            <>
                                <div className="w-11/12 flex justify-center px-4 full space-x-2 items-center">
                                    <img
                                        src={fileSelected && URL.createObjectURL(fileSelected)}
                                        className="max-w-40 max-h-32"
                                    />
                                    <p className="w-11/12 text-sm">{fileSelected?.name}</p>
                                </div>
                                <button onClick={() => setFile([])} className="w-5 h-5 bg-grey-light flex items-center justify-center rounded-full text-white text-sm">x</button>
                            </>

                            : <input
                                id='message'
                                value={message && message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-11/12 pl-2  rounded-lg  h-10 outline-none bg-white text-sm" />
                        }
                        <input
                            type="file"
                            id="image-profile"
                            style={{ display: "none" }}
                            name="file"
                            accept="image/*"
                            onChange={handleChangefile}
                        />
                        <p className="cursor-pointer" onClick={handleImageClick}>{Icons.clip}</p>
                        <button onClick={sendMessageUser} className="bg-menu text-white w-9 h-9  text-xl rounded-full flex justify-center items-center float-right mr-10 mb-0.5">{Icons.send}</button>

                    </div>
                </form>
            }
        </div>
    )
}

export default PanelChat
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import useSocketIO from '../../utils/hoocks/useSocketIO';
import Modal from 'react-responsive-modal';
import ViewMessage from './ViewMessage';

const MessagePlanel = ({ message, user }) => {

    const [showModal, setShowModal] = useState(null);

    useEffect(() => {
        var objDiv = document.getElementById("divu");
        objDiv.scrollTop = objDiv.scrollHeight;
    })



    const openMessage = (e) => {
        if (e.contentType === 2) {
            setShowModal(e);
        }

    }

    return (
        <>
            < div id='divu' className="w-full h-full   overflow-auto  pb-6  ">
                {
                    message && message?.map((m, i) => {
                        return (



                            <div key={i} className={`w-full flex flex-col min-h-12   overflow-hidden mt-3 ${m?.send === 2 ?
                                'justify-end items-end pl-4' : 'pr-4 justify-start items-start '}`}>
                                <div className={` ${m.send == 2 ? 'flex flex-row-reverse ' : 'flex '}`} >
                                    <img
                                        src={m.send === 2 ? user.admin.photo : user.user.photo}
                                        className="w-6 h-6 mx-2"
                                    />
                                    <p onClick={() => openMessage(m)} className={` text-sm shadow-lg 
                                 ${m?.send === 2 ? 'bg-menu text-white admin   ' :
                                            ' -ml-1 bg-white border border-menu text-menu client flex justify-center'} 
                                max-w-full  pt-2 mt-2 pb-2 px-6 overflow-hidden `}>
                                        {m?.contentType === 1 ? m?.content :
                                            m.contentType === 2 ?
                                                <img
                                                    src={m?.content}
                                                    className="w-32 h-30"
                                                />
                                                : ''
                                        }

                                    </p>
                                </div>
                                <a className="text-grey-light text-terminos font-light px-2">{moment(m?.createdAt).format('L')}</a>



                            </div>




                        )
                    })

                }

                <Modal
                    open={showModal}
                    onClose={() => setShowModal('')}
                    center
                >
                    <ViewMessage
                        view={showModal}
                    />
                </Modal>

            </div>
        </>

    )
}

export default MessagePlanel
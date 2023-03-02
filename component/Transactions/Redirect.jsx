import React, { useContext, useState } from 'react'
import { useRouter } from "next/router";
import QrReader from 'react-qr-scanner';
import { Context } from '../../providers/user/context';
import { Routes } from '../../utils/routes';
import { getDetailsTransactions } from '../../providers/api/transaction.queries';

const Redirect = ({ onClose }) => {

    const router = useRouter();
    const { resScar, setResSacan } = useContext(Context);
    const [tab, setTab] = useState(1);

    const handleScan = async (result) => {
        if (result) {
            const res = await getDetailsTransactions(result?.text);
            if (res) {
                setResSacan(res);
                onClose();
                return router.push(Routes.transaction)
            } else {
                setTab(2)
            }


        }
    };


    const previewStyle = {
        height: 240,
        width: 320
    };


    const handleError = (error) => {
    };


    return (
        <div>
            {tab === 1 ?
                <QrReader
                    delay={500}
                    style={previewStyle}
                    onError={handleError}
                    onScan={handleScan}
                />
                :
                <div>
                    Erro al escanear vuelva a intentar
                    <button
                        onClick={() => setTab(1)}
                    >volver a escanear</button>
                </div>
            }
        </div>
    )
}

export default Redirect
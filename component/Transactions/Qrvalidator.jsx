import React, { useContext, useState } from 'react'
import QrReader from 'react-qr-scanner';
import { getDetailsTransactions } from '../../providers/api/transaction.queries';
import Details from './Details';
import { useRouter } from "next/router";
import { Routes } from '../../utils/routes';
import { Context } from '../../providers/user/context';
const Qrvalidator = ({ data, onClose }) => {

    const [result, setResult] = useState([]);
    const [tab, setTab] = useState(1);
    const [res, setRes] = useState(null);
    const router = useRouter();
    const {resScan,setResSacan} = useContext(Context);


    const handleScan = async (result) => {
        if (result) {
            setResult(result);
            const res = await getDetailsTransactions(result?.text);
            if (res) {
                setResSacan(res?.data);
                onClose();
              
                return router.push(Routes.transaction)
                // setRes(res);
                // setTab(2);

            } else {
             
            }

        }
    };

    const handleError = (error) => {
    };


    const previewStyle = {
        height: 240,
        width: 320
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
                : tab === 2 ?
                    <Details
                        detail={res}
                        data={data}
                        onClose={onClose}

                    />
                    : ''
            }

        </div>
    )
}

export default Qrvalidator
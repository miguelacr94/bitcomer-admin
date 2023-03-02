
import React, { useState } from 'react';

import QrReader from 'react-qr-scanner';
import { getDetailsTransactions } from '../../providers/api/transaction.queries';
import { Icons } from '../../utils/icons';
import Details from './Details';

const ReadQr = ({ data, onClose, resp }) => {


  const [result, setResult] = useState([]);
  const [tab, setTab] = useState(1);
  const [res, setRes] = useState(null);

  const handleScan = async (result) => {
    if (result) {
      if (result?.text !== data._id) {
        setTab(3);
      } else {
        setResult(result);
        const res = await getDetailsTransactions(result?.text);
        if (res) {
          setRes(res);
          setTab(2);

        }
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
    <>
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
            resp={(e) => resp(e)}
            onClose={onClose}

          />
          : tab === 3 ?

            <div className="flex flex-col justify-center items-center w-80">
              <h1 className="mt-4 text-center text-black font-bold text-2xl">Código QR invalido</h1>
              <p className="text-center text-8xl text-yellow-400 mt-4">{Icons.warning}</p>
              <p className="text-center text-black font-semibold mt-4">Por favor compruebe que el código sea correcto o pertenezca a esta compra!</p>

              <button className="p-2 px-4 bg-menu rounded-md text-white mt-4"
                onClick={() => setTab(1)}
              >Volver a escanar</button>

            </div>
            : ''
      }
    </>
  )
}

export default ReadQr
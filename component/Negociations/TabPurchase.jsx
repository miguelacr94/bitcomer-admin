import React, { useState } from 'react'
import PurchaseForm from '../Form/PurchaseForm';

const TabPurchase = () => {
    const [tab, setTab] = useState(1);
    return (
        <div className="w-3/6 mr-4 border border-bTap rounded-sm pb-12 ">


            <div className="flex ">
                <div onClick={() => setTab(1)} className={`${tab === 1 ? 'border-t border-t-4 border-t-menu' : ''} w-3/6 h-16  border-r border-b border-bTap flex justify-center items-center font-bold`}>COMPRAR</div>
                <div onClick={() => setTab(2)} className={`${tab === 2 ? 'border-t border-t-4 border-t-menu' : ''}  w-3/6 h-16 border-b border-btab flex justify-center items-center font-bold`} >VENDER</div>
            </div>

            <div className="p-4">
                {tab === 1 ?
                    <PurchaseForm />
                    :
                    <p>?</p>
                }
            </div>

            <hr className="w-5/6 bg-grey-line h-line my-2 m-auto" />
            <div className="flex flex-col justify-center items-center  ">
                <p>Estas Comprando</p>
                <span className="font-bold ">0.011 BTC</span>
            </div>

        </div>
    )
}

export default TabPurchase
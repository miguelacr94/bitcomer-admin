import React from 'react'
import Input from '../Ui/Input'
import Select from '../Ui/Select'

const PurchaseForm = () => {
    return (
        <div>
            <Select
                label='Comprando'
                className="w-full"

            />
            <Input
                label='Dirección de Wallet'
                className="w-full"
            />
            <div className="flex w-full">
                <Input
                    label='Monto en pesos'
                    className="w-5/6"
                />
                <Input
                    label='Recibirás en BITCOIN'
                    className="w-full"
                />
            </div>

        </div>
    )
}

export default PurchaseForm
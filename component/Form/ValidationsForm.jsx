import React from 'react'
import Button from '../Ui/Button'
import Input from '../Ui/Input'
import Select from '../Ui/Select'

const ValidationsForm = () => {
    return (
        <div className="w-full bg-grey-fondoForm " >
            <Select
                placeholder='Nacionalidad'
                className='opacity-60'
            />
            <Select
                placeholder='País de Recidencía'
                className='opacity-60'
            />
            <Input
                placeholder='Ciudad de Recidencía'
                className='opacity-60'
            />
            <Input
                placeholder='Departamento de Recidencía'
                className='opacity-60'
            />
            <Input
                placeholder='Numero de telefono'
                className='opacity-60'
            />
            <Select
                placeholder='Profesíon u Oficio'
                className='opacity-60'
            />
            <Button
                text='Solicitar verificación'
                className='px-4 py-1 bg-menu mt-2 float-right'
            />
        </div>
    )
}

export default ValidationsForm
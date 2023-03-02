import React from 'react'
import FormSucursal from '../Form/FormSucursal'

const RegisterSucursal = ({ pais }) => {
  return (
    <div className='mt-12'>
      <h1 className='text-xl font-semibold text-menu text-center pb-4'>Registro de sucursal</h1>
      <FormSucursal
        pais={pais}
      />
    </div>
  )
}

export default RegisterSucursal
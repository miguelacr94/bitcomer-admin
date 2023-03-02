import React from 'react'
import FormAliado from '../Form/FormAliado'

const RegisterAliado = ({ pais }) => {
  return (
    <div className='w-formSucursal mt-12'>
      <h1 className='text-xl font-semibold text-menu text-center'>Registro de aliado</h1>
      <FormAliado
        pais={pais}
      />
    </div>
  )
}

export default RegisterAliado
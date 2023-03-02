import React from 'react'
import { Icons } from '../../utils/icons'
import Button from '../Ui/Button'
import ValidationsForm from './ValidationsForm'

const Validations = () => {
  return (
    <div className="w-full text-blackText flex flex-col justify-start pl-14">

      <div className="w-9/12 border boder-grey-light float-right flex justify-start items-center h-24 p-2 ">
        <div className="rounded-full w-8 h-8 border border-grey-don bg-grey-fondo flex justify-center items-center">
          1
        </div>
        <div className="ml-2 text-grey-bNav">
          <h3 className="font-bold">Validación de identidad</h3>
          <p>Ten a mano tu cédula de identidad y haz clic en el botón a continuación </p>
        </div>
        <div className="flex justify-center items-center ml-8">
          <div className=" border border-grey-ligth flex justify-center items-center pl-2">
            
              <p className="m-2">{Icons.Verification}</p>
            
            <Button
              text='Verificame'
              className="px-6 bg-blue-400 py-1"
            />
          </div>
        </div>
      </div>

      <div className="w-9/12 border boder-grey-light float-right  justify-start items-center  p-2 mt-4">
        <div className="flex">
          <div className="rounded-full w-8 h-8 border border-grey-link bg-grey-fondo flex justify-center items-center">
            2
          </div>

          <div className="ml-2 text-grey-bNav">
            <h3 className="font-bold">Validación de identidad</h3>
            <p>Ten a mano tu cédula de identidad y haz clic en el botón a continuación</p>
          </div>

        </div>


        <div className="w-4/6 px-2 mt-4 py-1 bg-grey-fondoForm ml-2 ">
          <ValidationsForm />
        </div>


      </div>


    </div>
  )
}

export default Validations
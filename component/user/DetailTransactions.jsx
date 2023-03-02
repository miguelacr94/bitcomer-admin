import React from 'react'
import { Icons } from '../../utils/icons';
import { capitalizer, currencyFormat } from '../../utils/helpers';
import moment from 'moment';


const DetailTransactions = ({data}) => {


  return (
   <div className="w-detail  mt-6 ">


      <div className="lg:w-full w-full flex space-x-4 mt-4 justify-center">


        <div className={`${data?.qr ? 'w-full' : 'lg:w-full w-full'}  border shadow-xl rounded-xl  flex flex-col justify-center items-center p-4 space-y-2 `}>
          <div className={`w-full flex flex-col justify-center text-center items-center  pb-4
      ${data?.status === 'completado' ? 'text-green-400' :
              data?.status === 'pendiente' ? 'text-yellow-400' :
                data?.status === 'declinada' ? 'text-red-400' :
                  ''
            }
      
      `}>
            <p className={` text-4xl`}>
              {
                data?.status === 'pendiente' ? Icons.warningCircle :
                  data?.status === 'completado' ? Icons.checkCircle :
                    data?.status === 'declinada' ? Icons.error :
                      ''
              }

            </p>
            <h1 className="mt-2  font-semibold text-xl"> {capitalizer(data?.purchaseType)}  {
              data?.status === 'completado' ? 'completada' :
                data?.status === 'declinada' ? 'rechazada' :
                  data?.status === 'pendiente' ? 'pendiente' : ''
            }
            </h1 >


          </div>
          <div className={`w-full  flex lg:flex-row flex-col justify-center items-center  space-x-4 `}>


            {data && data?.qr &&
              <div className="w-3/6 h-64 flex flex-col justify-center items-center pb-4">
                <img
                  src={data?.qr}
                  className="w-40 h-30"
                />
                <p className="text-sm mt-4 text-menu font-semibold text-center text-40">Debes acercarte con este código Qr a cualquiera de nuestras oficinas</p>
              </div>
            }


            <div className={`w-full pr-4 space-y-2`}>
              <div className="flex w-full ">
                <p className="w-1/6  text-sm font-semibold text-order">
                  Código:
                </p>
                <p className="w-5/6 text-end text-grey-light font-light text-sm">
                  {data.code}
                </p>
              </div>
              <div className="flex w-full">
                <p className="w-1/6 text-sm font-semibold text-order">
                  Fecha:
                </p>
                <p className="w-5/6 text-end text-grey-light font-light text-sm">
                  {moment(data?.createdAt).format('L')}
                </p>
              </div>
              <div className="flex w-full">
                <p className="w-3/6 text-sm font-semibold text-order">
                  Método de pago:
                </p>
                <p className="w-4/6 text-end text-grey-light font-light text-sm">
                  {data?.paymentMethod}
                </p>
              </div>
              {data?.purchaseType === 'compra' &&
                < div className="flex w-full">
                  <p className="w-1/6 text-sm font-semibold text-order">
                    Wallet:
                  </p>
                  <p className="w-5/6 text-end text-grey-light font-light text-sm">
                    {data?.wallet}
                  </p>
                </div>
              }
              <div className="flex w-full">
                <p className="w-1/6 text-sm font-semibold text-order">
                  Moneda:
                </p>
                <p className="w-5/6 text-end text-grey-light font-light text-sm flex justify-end items-center space-x-1">
                  {/* <span>
                    {
                      currency && currency[0]?.map((c, i) => {
                        if (c.symbol === data?.crypto?.cryptoId?.code) {
                          return (
                            <img
                              src={c.icon}
                              className="h-4 h-4"
                            />
                          )
                        }
                      })
                    }
                  </span> */}
                  <span>
                    {data?.crypto?.cryptoId?.code}
                  </span>



                </p>
              </div>
              <div className="flex w-full">
                <p className="w-1/6 text-sm font-semibold text-order">
                  Cantidad:
                </p>
                <p className="w-5/6 text-end text-grey-light font-light text-sm">
                  {data?.crypto?.quantity.toFixed(2)}
                </p>
              </div>
              {data?.purchaseType === 'venta' &&
                <>
                  <div className="flex w-full">
                    <p className="w-1/6 text-sm font-semibold text-order">
                      Cuenta:
                    </p>
                    <p className="w-5/6 text-end text-grey-light font-light text-sm">
                      {data?.account?.bank}
                    </p>
                  </div>
                  <div className="flex w-full">
                    <p className="w-3/6 text-sm font-semibold text-order">
                      Tipo de cuenta:
                    </p>
                    <p className="w-4/6 text-end text-grey-light font-light text-sm">
                      {data?.account?.typeAccount}
                    </p>
                  </div>
                  <div className="flex w-full">
                    <p className="w-1/6 text-sm font-semibold text-order">
                      Number:
                    </p>
                    <p className="w-5/6 text-end text-grey-light font-light text-sm">
                      {data?.account?.number}
                    </p>
                  </div>
                </>
              }

              <hr className="bg-grey-bTab w-full h-0.5" />
              <div className="flex w-full">
                <p className="w-1/6 text-sm font-semibold text-order">
                  Pago:
                </p>
                <p className="w-5/6 text-end text-grey-light font-light text-sm">
                  {currencyFormat(data?.value)} {data?.currency}
                </p>
              </div>
              {/* <div className="flex w-full">
                <p className="w-3/6 text-sm font-semibold text-order">
                  Pago por comision:</p>
                <p className="w-3/6 text-end text-grey-light font-light text-sm">{0}</p>
              </div> */}
              <div className="flex w-full">
                <p className="w-3/6 text-sm font-semibold text-order">
                  Pago total:</p>
                <p className="w-3/6 text-end text-grey-light font-light text-sm">
                  {currencyFormat(data?.value)} {data?.currency}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div >
  )
}

export default DetailTransactions
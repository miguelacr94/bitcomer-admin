import React from 'react'
import moment from 'moment';
import Pagination from '../Ui/Pagination';
import { Icons } from '../../utils/icons';
import { currencyFormat, myRound } from '../../utils/helpers';

const TableGiros = ({ className, item, giro, data, totalPages, onPageChange, onSelected }) => {




  return (
    <div className={` ${className}`}>

      <table className=" w-full mt-2 ">
        <thead>
          <tr className=" text-grey-head  ">
            {giro && giro.map((item, index) => {
              return (
                <th className={`${item == 'Titular' ? 'w-40' : ''} text-start h-8 pl-6 font-light text-sm `}>{item.name}</th>
              )
            })}

          </tr>
        </thead>
        <tbody className="rowAlternate">

          {
            data && data?.map((d, index) => {


              return (



                <tr key={index} onClick={() => onSelected(d)} className="h-8 text-xs font-semibold  text-dataTable cursor-pointer">
                  <td className="pl-6 ">{index + 1}</td>
                  <td className="pl-6 ">{d.code}</td>



                  <td className="pl-6 ">
                    <div className='flex items-center space-x-2'>
                      <p className={`w-5 h-5 rounded-full 
                                            ${d?.status === 'pendiente' ? 'bg-yellow-400' :
                          d?.status === 'completado' ? 'bg-menu' :
                            d?.status === 'declinada' ? 'bg-red-400' :
                              d?.status === 'pagado' ? 'bg-green-600' :
                                d?.status === 'aprobada' ? 'bg-green-400' :
                                  ''}
                                            `}></p>
                      <p>{d.status}</p>
                    </div>
                  </td>

                  <td className="pl-6">
                    <div className='flex items-center space-x-1'>
                      <p>{Icons.calendar}</p>
                      <p> {moment(d?.createdAt).format('L')}</p>
                    </div>

                  </td>
                  <td className="pl-6">
                    <div className='flex items-center space-x-1'>
                      <img
                        src={d?.crypto?.cryptoId?.image}
                        className='w-5 h-5'
                      />
                      <p> {d?.crypto?.cryptoId?.code}</p>
                    </div>


                  </td>
                  <td className="pl-6">{myRound(d?.crypto?.quantity)}</td>
                  <td className="pl-6">{currencyFormat(d?.value)}</td>
                </tr>
              )

            })
          }


        </tbody>
      </table>
      {totalPages && totalPages > 0 && (
        <Pagination totalPages={totalPages} onPageChange={onPageChange} />
      )}
    </div>
  )
}

export default TableGiros
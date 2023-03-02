import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import GiroDetails from '../component/Giro/GiroDetails';
import MainLayout from '../component/Layouts/MainLayout'
import RegisterAliado from '../component/Sucursal/RegisterAliado';
import RegisterSucursal from '../component/Sucursal/RegisterSucursal';
import ViewRegister from '../component/Sucursal/ViewRegister';
import TableGiros from '../component/tables/TableGiros';
import { getCountryRegister } from '../providers/api/home.queries';
import { getGiro, getSocio } from '../providers/api/list.queries';
import { giro } from '../utils/data';


const sucursal = () => {

    const [tab, setTab] = useState('aliado');
    const [country, setCountry] = useState();
    const [dataGiro, setGiro] = useState();
    const [totalPages, setTotalPages] = useState(null);
    const [page, setPage] = useState(1);
    const [giroSelected, setGiroSelected] = useState(null);




    const getCountries = async () => {
        const res = await getCountryRegister();
        if (res) {
            setCountry(res.data);
        }
    }

    const getGiros = async () => {
        const res = await getGiro(page);
        if (res) {        
            setGiro(res.data.docs);
            setTotalPages(res.data.totalPages);
        } else {

        }
    }




   

    useEffect(() => {
        getGiros();
    }, [setGiro, page]);


    useEffect(() => {
        getCountries();
    }, [setCountry]);



    const updateData = (e) => {  // reemplaza la data del giro seleccionado en el detalle y lo reemplaza por la nueva data
        // const index = dataGiro.findIndex((t) => t._id == e._id);
        // if (index != -1) {
        //     dataGiro[index] = e;
        //     setGiro([...dataGiro]);
        // }
        getGiros();
    }




    return (
        <MainLayout>
            <div className="w-full flex flex-col pl-20 mt-36 ">

                <div className='w-purchase  flex  bg-white  overflow-hidden h-12 '>


                    <div onClick={() => setTab('aliado')} className={`w-64 border rounded-l-xl font-semibold ${tab === 'aliado' ? 'cursor-pointer bg-menu text-white' : 'text-menu bg-white'} cursor-pointer w-64 flex justify-center items-center`}>
                        <p>Registrar aliado</p>
                    </div>
                    <div onClick={() => setTab('sucursal')} className={`w-64 border font-semibold ${tab === 'sucursal' ? 'cursor-pointer bg-menu text-white' : 'text-menu bg-white'} cursor-pointer w-64 flex justify-center items-center border-x`}>
                        <p>Registrar sucursal</p>
                    </div>
                    <div onClick={() => setTab('lista')} className={`w-64 border  font-semibold ${tab === 'lista' ? 'cursor-pointer bg-menu text-white' : 'text-menu bg-white'} cursor-pointer  flex justify-center items-center`}>
                        <p>Ver giros</p>
                    </div>
                    <div onClick={() => setTab('registros')} className={`w-64 border rounded-r-xl font-semibold ${tab === 'registros' ? 'cursor-pointer bg-menu text-white' : 'text-menu bg-white'} cursor-pointer  flex justify-center items-center`}>
                        <p>Ver aliados y sucursales</p>
                    </div>

                </div>

                <div className='w-formSucursal '>
                    {tab === 'aliado' &&
                        <div className='ml-24'>
                            <RegisterAliado
                                pais={country}
                            />
                        </div>

                    }
                    {tab === 'sucursal' &&
                        <div className='ml-24'>
                            <RegisterSucursal
                                pais={country}
                            />
                        </div>

                    }
                    {
                        tab === 'lista' &&
                        <div className='mt-12 '>
                            {giroSelected ?
                                <GiroDetails
                                    giroDetail={giroSelected}
                                    onBack={() => setGiroSelected('')}
                                    resDetail={(e) => updateData(e)}
                                />


                                :
                                <TableGiros
                                    giro={giro}
                                    data={dataGiro}
                                    totalPages={totalPages}
                                    onPageChange={(e) => setPage(e.selected + 1)}
                                    onSelected={(e) => setGiroSelected(e)}
                                />
                            }
                        </div>



                    }
                    {tab === 'registros' &&
                        <ViewRegister
                            tabs={tab}
                            
                        />
                    }
                </div>

            </div>
        </MainLayout>

    )
}

export default sucursal
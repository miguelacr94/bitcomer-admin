import React, { useEffect, useState } from 'react'
import Countries from '../component/Countries'
import MainLayout from '../component/Layouts/MainLayout'
import TableOtc from '../component/tables/TableOtc'
import { Icons } from '../utils/icons'
import { Otc } from '../utils/data'
import { getAllOtc } from '../providers/api/transaction.queries'
import OtcDetails from '../component/Otc/OtcDetails'
import { useDebounce } from 'use-debounce';

const otc = () => {

    const [filterCountry, setFilterCountry] = useState(null);
    const [otc, setOtc] = useState();
    const [otcSelected, setOtcSelected] = useState();
    const [totalPages, setTotalPage] = useState();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState(null);
    const [valueSearch] = useDebounce(search, 500);


    const getOtc = async (data) => {
        const res = await getAllOtc(page, data);
        if (res) {
          
            setOtc(res.data.docs);
            setTotalPage(res.data.totalPages);
        }
    }


    useEffect(() => {
        getOtc();
    }, [setOtc])


    useEffect(() => {
        if (valueSearch) {
            getOtc(valueSearch);
        } else {
            getOtc();
        }

    }, [valueSearch])




    const updateData = (e) => {  // reemplaza la data del giro seleccionado en el detalle y lo reemplaza por la nueva data


        // const index = otc.findIndex((t) => t._id == e._id);
        // if (index != -1) {
        //     otc[index] = e;
        //     setOtc([...otc]);
        // }

        getOtc();
    }



    return (
        <MainLayout>
            <div className="w-full flex flex-col pl-20 mt-36 pr-8 ">
                <div className="w-1/6 flex items-center justify-center flex-col">

                </div>


                <div className="flex justify-start items-start pr-16 ">


                    <div className="w-5/6 flex justify-start items-center space-x-3  mt-2 text-grey-placeholder2 ">
                        <div className="border-r-3 flex items-center ">
                            <p>{Icons.search}</p>
                            <input
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                                type="search"
                                placeholder='Buscar'
                                className="pl-2 placeholder:pl-2 outline-none placeholder:text-sm w-52 bg-white"
                            />

                        </div>


                        {filterCountry &&
                            <p
                                onClick={() => clearCountry('')}
                                className='bg-grey-bTab cursor-pointer text-white font-semibold rounded-full w-6 h-6 flex items-center justify-center'>
                                x
                            </p>
                        }

                    </div>
                </div>



                {!otcSelected ?
                    <div className="h-96 mt-8 ">
                        <TableOtc
                            otc={Otc}
                            data={otc}
                            onSelected={(e) => setOtcSelected(e)}
                            totalPages={totalPages}
                        />
                    </div>
                    :
                    <OtcDetails
                        onBack={() => setOtcSelected('')}
                        detailOtc={otcSelected}
                        resp={(e) => updateData(e)}

                    />

                }
            </div>


        </MainLayout>
    )
}

export default otc
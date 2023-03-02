import React, { useEffect, useState } from 'react'
import Countries from '../component/Countries';
import MainLayout from '../component/Layouts/MainLayout';
import TableUsers from '../component/tables/TableUsers'
import CardUser from '../component/user/CardUser';
import { getUsers } from '../providers/api/list.queries';
import { Icons } from '../utils/icons';
import { user } from '../utils/data';
import { useDebounce } from 'use-debounce';
const Users = () => {

    const [userSelect, setUserSelect] = useState(null);
    const [users, setUsers] = useState(null);
    const [load, setLoad] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [filterCountry, setFilterCountry] = useState(null);
    const [search, setSearch] = useState(null);
    const [valueSearch] = useDebounce(search, 500);


    const getUser = async (data, fc) => {

        setLoad(true);
        const res = await getUsers(page, data, fc);
        if (res) {

            setUsers(res?.user?.docs);
            setTotalPages(res?.user?.totalPages);
        }
    }


    // useEffect(() => {
    //     getUser(null, filterCountry?._id);
    // }, [setFilterCountry, filterCountry])


    useEffect(() => {
        getUser();
    }, [setUsers, setPage, page])


    const clearCountry = () => {
        setFilterCountry('');
    }


    useEffect(() => {
        if (valueSearch || filterCountry) {
            getUser(valueSearch, filterCountry?._id);
        }
        else {
            getUser();
        }

    }, [search, filterCountry]);



    return (
        <MainLayout>

            {!userSelect &&
                <div className="w-full flex flex-col pl-20 mt-36 pr-8 ">
                    <div className="w-1/6 flex items-center justify-center flex-col">
                        <h1 className="text-2xl text-grey-welcome font-bold ">Usuarios</h1>
                        <p className="text-grey  text-grey-placeholder2 ">(15 en total)</p>
                        {/* <button className="px-6 py-1 rounded-full bg-bar ml-4 flex text-white items-center"><span className="px-1">{Icons.addUser}</span>Crear usuario</button> */}
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
                            <div className="">
                                {Icons.filter}
                            </div>
                            <div className="flex space-x-3 justify-start items-center  ">
                                <p className="ml-9">País:</p>
                                <Countries
                                    setSelect={(e) => setFilterCountry(e)}
                                    countryClean={filterCountry}
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




                    <div className="h-96 mt-8 ">
                        <TableUsers
                            onSelect={(user) => setUserSelect(user)}
                            className="m"
                            user={user && user}
                            datauser={users}
                            pageSelect={(e) => setPage(e)}
                            totalPages={totalPages}
                            search={valueSearch}
                        // country={filterCountry?._id}
                        />
                    </div>



                </div>
            }
            <div className="w-full flex flex-col pl-20 mt-36 pr-8 pb-12">

                {userSelect &&
                    <>
                        <a onClick={() => setUserSelect('')} className=" -mt-12 underline text-grey-light cursor-pointer">Atrás</a>
                        <CardUser
                            userSelect={userSelect}
                            resData={(e) => setUserSelect(e)}
                        />
                    </>
                }
            </div>

        </MainLayout>
    )
}

export default Users
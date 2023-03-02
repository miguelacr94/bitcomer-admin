import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import MainLayout from '../../component/Layouts/MainLayout'
import { getDetailsSucursal } from '../../providers/api/sucursal.queries';

const Index = () => {

    const router = useRouter();
    const [details, setDetails] = useState();

    const getDetails = async (query) => {
        const res = await getDetailsSucursal(query);
        if (res) {
            setDetails(res.data);
        }

    }


    useEffect(() => {
        const query = router?.query?.id;
        if (query) {
            getDetails(query);
        }
    }, [setDetails]);



    return (
        <MainLayout>
            <div className='mt-24 w-5/6 ml-16'>
                juas juas
            </div>

        </MainLayout>


    )
}

export default Index

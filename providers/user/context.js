import { createContext, useEffect, useState } from "react";
import useIsMounted from "../../utils/hoocks/useIsMounted";
import useSocketIO from "../../utils/hoocks/useSocketIO";

import { getCountry } from "../api/home.queries";
// import { getCountry } from "../api/home.queries";


export const Context = createContext(null);


const inicialDate = {
    fullName: 'Harold Ortiz',
    nacionality: 'Colombia',
    country: 'Colombia',
    city: 'Bogota',
    address: 'Dg 9',
    phone: 3130000000,
    image: './image/admin.png'
}


export default function UserContext({ children }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [country, setCountry] = useState(null);
    const [currency, setCurrency] = useState([]);
    const [countrySelect, setCountrySelect] = useState(null);
    const [resScar, setResSacan] = useState(null);
    const isMounted = useIsMounted();
    const { isConnected, connectUser, stateUser} = useSocketIO();




    useEffect(() => {
        if (!isMounted) return null;
    }, [isMounted]);

    useEffect(() => {
        connectUser(user?._id);

    }, [setUser, user])


    useEffect(() => {

        if (country) {

            if (localStorage.getItem('country')) {
                const local = JSON.parse(localStorage.getItem('country') || [])
                setCountrySelect(country.find((c) => c.name === local.name));
            } else {
                setCountrySelect(country.find((c) => c.name === 'Colombia'))

            }

        }
    }, [setCountry, country]);





    const getCountries = async () => {
        const data = await getCountry();
        setCountry(data?.data);
    }

    useEffect(() => {
        // setLoading(true)
        // loadUser()
        setLoading(false)
        getCountries();
    }, []);




    return (

        <Context.Provider value={{ user, setUser, country, countrySelect, setCountrySelect, resScar, setResSacan }}>
            {
                loading
                    ? <span>...</span>
                    : children
            }

        </Context.Provider>
    )



}



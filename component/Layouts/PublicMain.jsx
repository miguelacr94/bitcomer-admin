import { useContext, useEffect } from "react";
import { getData } from "../../providers/user/actions";
import { Context } from "../../providers/user/context";
import { useRouter } from "next/router";
import Cookies from "../../utils/cookies";
import { Routes } from "../../utils/routes";


export default function PublicMain({ children }) {
    const { user, setUser } = useContext(Context);

    const router = useRouter();

    const loadUser = async () => {
        const token = Cookies.read("ssid");
        if (!token) {
        }
        if (token) {

            const a = await getData();
            if (a) {
                setUser(a);
                return router.push(Routes.home);
            } else {
                return router.push(Routes.index);
            }

        }
    }
    useEffect(() => {
        loadUser();
    }, []);

    return (
        <>
            <div className="w-full h-windows overflow-hidden">

                {children}

            </div>
        </>
    );

}


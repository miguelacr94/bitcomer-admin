import { useContext, useEffect } from "react";
import { getData } from "../../providers/user/actions";
import { Context } from "../../providers/user/context";
// import { getCountry } from "../../provider/api/home.queries";

import Cookies from "../../utils/cookies";
import Bar from "../Bar";
import NavBar from "../NavBar";

export default function MainLayout({ children }) {

  const { user, setUser } = useContext(Context);

  const loadUser = async () => {
    const token = Cookies.read("ssid");
    if (!token) {

    }
    if (token || !user) {
      const a = await getData();
      if (!a) {

      } else {
        setUser(a);
      }
    }
  }


  useEffect(() => {
    loadUser();
  }, [setUser])


  return (

    <>
      <Bar />
      <div className="ml-bar w-full ">
        < NavBar />

        <div className="w-full min-w-ventana min-h-ventana">
          {children}
        </div>

      </div >
    </>

  )


}
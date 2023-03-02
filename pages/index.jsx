import LoginForm from "../component/Form/LoginForm";
import PublicMain from "../component/Layouts/PublicMain";


export default function Home() {
  return (
    <PublicMain>
      <div className="w-full h-windows  flex imgLogin overflow-auto">
        <div className="absolute w-2/6 h-full bg-menu float-left -z-10">

        </div>
        {/* <img

          src="./image/fondoLogin.svg"
          className="absolute -z-10 w-11/12 h-windows  -ml-32"
        /> */}

        <div className="w-9/12 h-full   flex justify-center items-start pr-16 ">

          <div className="w-3/6 h-96   text-center mt-36 ">
            <h1 className="text-register font-bold text-5xl text-white">Bitcomer</h1>
            <p className="text-xl font-semibold text-white  mt-10">Bienvenid@ de regreso</p>

            <LoginForm />
          </div>
        </div>
        <div className="w-3/12 h-full fontoRegister relative flex items-center">
          {/* <img
            src="./image/userLogin.png"
            className="absolute -ml-48 -mt-20"
          /> */}
        </div>
      </div>
    </PublicMain>
  )
}

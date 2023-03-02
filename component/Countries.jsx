import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../providers/user/context';
import { Icons } from '../utils/icons'


const initialDate = {
    name: 'Colombia',
    flat: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Colombia.svg/1200px-Flag_of_Colombia.svg.png'
}

const Countries = ({ setSelect, countryClean }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [countrySelect, setCountrySelect] = useState(countryClean);
    const { country, setCountry } = useContext(Context);

    useEffect(() => {
        document.addEventListener('click', function (event) {
            if (event.target.localName === 'svg') {
            } else if (event?.target?.id !== 'myMenu') {
                setTimeout(() => {
                    setShowMenu(false);
                }, 100);
            }
        });

    });


    const countrySelected = (e) => {
        // setCountrySelect(e);
        setSelect(e);
    }


    // useEffect(() => {
    //     // console.log(countryClean);
    //     setCountrySelect('');

    // }, [countryClean])



    return (
        <div className="flex flex-col relative cursor-pointer">
            <div id="myMenu" onClick={() => setShowMenu(!showMenu)} className="w-48 h-full border border-grey-bInput  py-2 rounded-full flex justify-center items-center text-grey h-full ">
                {countryClean &&
                    <div className="h-6 w-6 rounded-full  flex justify-center items-center overflow-hidden">

                        <img
                            id="myMenu"
                            src={countryClean && countryClean.flag}
                            className="w-full h-full"
                        />


                    </div>
                }
                <div id="myMenu" className="ml-2 text-grey-placeholder2  text-sm w-20">Seleccione</div>
                <p id="myMenu" className="text-xs text-grey-placeholder2 h-full flex justify-center items-center mt-">{Icons.DownArrow}</p>
            </div>

            {showMenu &&
                <div className="absolute mt-12 w-5/6 bg-white py-4 ml-8 rounded-md shadow-2xl transition ease-in-out duration-300">
                    {country.map((e, i) => {
                        return (
                            // <MenuItem key={i} href={e.path}>
                            //   {e.name}
                            // </MenuItem>
                            <div onClick={() => countrySelected(e)} key={i} className="hover:bg-Option  w-full flex justify-start items-center px-2"  >
                                <div className="h-6 w-6 rounded-full bg-grey flex justify-center items-center overflow-hidden">
                                    <img
                                        src={e.flag}
                                        className="w-full h-full"
                                    />
                                </div>
                                <a
                                    type="button"
                                    // href={e.path}
                                    className="flex  h-8  items-center justify-start ml-2 text-xs text-black font-semibold"
                                >
                                    {e.name}
                                </a>
                            </div>

                        );
                    })}
                </div>
            }

        </div>

    )
}

export default Countries
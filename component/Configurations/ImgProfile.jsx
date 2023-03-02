import React, { useState, createRef, useEffect, useContext } from 'react'
import { updateUser } from '../../providers/user/actions';
import { Context } from '../../providers/user/context';
import { toastTypes, viewFormData } from '../../utils/helpers';
import { useToasts } from "react-toast-notifications";

const ImgProfile = ({ photo }) => {

    const [poster, setPoster] = useState(null);
    const [state, setState] = useState(null);
    const [image, setImage] = useState();
    const { user, setUser } = useContext(Context);
    const { addToast } = useToasts();




    const handleImageClick = () => {
        document.querySelector('#image-profile').click();
    }

    const handleChangeImage = async (data) => {

        if (data) {
            const file = data.target.files[0];
            if (file) {

                setImage({ ...image, image: file });

                const payload = new FormData();
                payload.append("photo", file);
                viewFormData(payload);

                const res = await updateUser(payload);
                if (res) {
                    setUser(res?.data);
                    addToast('Imagen actualizada',
                        { appearance: toastTypes.SUCCESS });
                } else {
                    addToast('Error al actualizar',
                        { appearance: toastTypes.ERROR });
                        setImage('');
                }

            }
        }
    }



    useEffect(() => {
        setPoster(image);
    }, [setPoster, image]);


    return (
        <>
            {/* <DropZone
                acceptedTypes="image/*"
                onFileSelected={onPosterSelected}
                file={poster}

            // style={{}}
            /> */}

            <div className="w-36 h-36 rounded-full bg-white mr-2 flex justify-center items-center  border-2 overflow-hidden cursor-pointer ">
                <img
                    src={image?.image?.name ? URL.createObjectURL(image?.image) : photo}
                    className="w-full h-full cursor-pointer"
                />

                <i className="bg-positive w-3 h-3 rounded-full absolute ml-24  mt-24"></i>
                <input
                    type="file"
                    id="image-profile"
                    // style={{ display: "blick" }}
                    name="file"
                    className="bg-white w-24 h-24 absolute opacity-0 cursor-pointer "
                    onChange={handleChangeImage}

                />
            </div>
        </>
    )
}

export default ImgProfile
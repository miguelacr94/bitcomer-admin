import React from 'react'
import moment from 'moment';

const ViewMessage = ({ view }) => {
    console.log(view);

    const download = (e) => {
       
        fetch(e.target.href, {
            method: "GET",
            headers: {}
        })
            .then(response => {
                response.arrayBuffer().then(function (buffer) {
                    const url = window.URL.createObjectURL(new Blob([buffer]));
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", "image.png"); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleDownLoadClick = () => {
        document.querySelector('#image').click(); //selecciona input file
    }


    return (
        <div className='w-openMessage h-chat flex flex-col justify-center'>
            <h1 className='text-grey-light text-ms text-center'>{moment(view?.createdAt).format('L')}</h1>
            <div className='mt-2 w-full h-chat flex justify-center items-center'>
                <img
                    id='image'
                    src={view.content}
                    className="max-w-64 max-h-full"
                    download
                    onClick={(e) => download(e)}
                />
            </div>

            <button
                onClick={handleDownLoadClick}
                className='w-32 text-white bg-menu h-11 rounded-lg mt-2 m-auto'>Descargar</button>
        </div>
    )
}

export default ViewMessage
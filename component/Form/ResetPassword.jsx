import React, { useState } from 'react'
import { resetPassword } from '../../providers/user/actions';

const ResetPassword = () => {

    const [form, setForm] = useState('');




    const onResetPassword = async (e) => {
        const data = await  resetPassword(form.email);
    }


    
    return (
        <div >
            <form className="w-80" >
                <div className="">s
                    <label>Email</label>
                    <input
                        id='email'
                        type="text"
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        defaultValue={(form && form.email)}

                    ></input>
                </div>
             
            </form>

            <button type="submit" onClick={() =>onResetPassword()}>Enviar</button>

        </div>
    )
}

export default ResetPassword
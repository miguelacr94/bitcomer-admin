import React, { useState } from 'react'
import { SendNewPassword } from '../../providers/user/actions'


const ResetPasswords = ({token}) => {

    const [form, setForm] = useState('')

    const onSendPassword = async () => {

        const payload = {
            password: form.password,
            token: token
        }
        const data = await SendNewPassword(payload);
    }
    return (

        <div>

            <form>
                <input
                    className="w-full"
                    type="text"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    defaultValue={(form && form.password)}
                />
            </form>

            <button onClick={() => onSendPassword()}>Enviar</button>
        </div>

    )
}

export default ResetPasswords
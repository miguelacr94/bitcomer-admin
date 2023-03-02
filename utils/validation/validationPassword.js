export const validationPassword = () =>{
    if (!form?.password) {
        setPassword({ ...password, message: 'Contraseña es requerida' });
        return document.getElementById("password").focus();
    }

    else if (!/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){0})(?=.*\d)((?=.*[a-z]){0})((?=.*[A-Z]){0})((?=.*[0-9]){1}).*$/i.test(form.password)) {
        setPassword({ ...password, message: 'ingresa 8 o más caracteres con una combinación de letras y numeros' });
        return document.getElementById("password").focus();
    } else {
        setPassword({ ...password, message: null });
    }
}
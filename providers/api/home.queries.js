import Call from "../../utils/call";



export const getCountry = async () => {
    try {
        const res = await Call("GET", "config/countries");
        if (res.success) {
            return res;
        }
        return;
    } catch (err) {
        console.error(err);
        return;
    }
};


export const getTransactionsUser = async (idUser) => {
    try {
        const res = await Call("GET", `purchase/user/${1}/${5}/${idUser}`);
        if (res.success) {
            return res;
        }
        return;
    } catch (err) {
        console.error(err);
        return;
    }
};

export const getTransactionsMe = async (idUser) => {
    try {
        const res = await Call("GET", `purchase/report-me/?${idUser}`);
        if (res.success) {
            return res;
        }
        return;
    } catch (err) {
        console.error(err);
        return;
    }
};

export const getAllTransactions = async (idUser) => {
    try {
        const res = await Call("GET", `purchase/report`);
        if (res.success) {
            return res;
        }
        return;
    } catch (err) {
        console.error(err);
        return;
    }
};


export const getUserCount = async () => {
    try {
        const res = await Call("GET", `purchase/report`);
        if (res.success) {
            return res;
        }
        return;
    } catch (err) {
        console.error(err);
        return;
    }
};

export const getCountryRegister = async () => {

    try {
        const res = await Call("GET", `config/countries`, null);

        if (res.success) {
            return res;
        }
        return;
    } catch (err) {
        console.error(err);
        return;
    }
};



export const sendAliado = async (data) => {

    try {
        const res = await Call('POST', 'config/partner', data, 1);
        if (res) {
            return res;
        }
        return
    } catch (err) {
        console.error(err);
        return err
    }
}


export const sendSucursal = async (data) => {
    // const { addToast } = useToasts();

    try {
        const res = await Call('POST', 'config/branch', data, 1);
      
        if (res) {
            return res;
        }
        return false;
    } catch (err) {
        console.error(err);
        return err

        // if (err?.response?.data?.data === 801) {
        //     addToast("El correo electrónico ya es utilizado por una sucursal", {
        //         appearance: toastTypes.ERROR,
        //     });
        // }
        return
    }
}
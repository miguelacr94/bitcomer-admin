import Call from "../../utils/call";


export const getTransactions = async (page, data, country) => {

    const limit = 15;
    try {
        const res = await Call("GET", `purchase/${page}/${limit}/?search=${data}&country=${country}`, null, 1);
        if (res.success) {
            return res;
        }
        return;
    } catch (err) {
        console.error(err);
        return;
    }
};


export const getDetailsTransactions = async (id) => {

    try {
        const res = await Call("GET", `purchase/detail/info/${id}`, null, 1);
        if (res.success) {
            return res;
        }
        return;
    } catch (err) {
        console.error(err);
        return;
    }
};


export const aprobateTransaction = async (id, qr, payload) => {




    try {
        const res = await Call("PUT", `purchase/update/status/${id}?qr=${qr}`, payload, 1);
        if (res.success) {
            return res;
        }
        return;
    } catch (err) {
        console.error(err);
        return;
    }
};




export const getTransactionsUser = async (id, page) => {

    try {
        const res = await Call("GET", `purchase/user-detail/${page}/${5}/${id}`, null, 1);
        if (res.success) {
            return res;
        }
        return;
    } catch (err) {
        console.error(err);
        return;
    }
};



export const updateCurrency = async (payload, percentageId) => {


    try {
        const res = await Call("PUT", `/config/update/percentage/${percentageId}`, payload, 1);
        if (res.success) {
            return res;
        }
        return;
    } catch (err) {
        console.error(err);
        return;
    }
};


export const getAllReport = async () => {

    try {
        const res = await Call("GET", `/purchase/reports`, null, 1);
        if (res.success) {
            return res;
        }
        return;
    } catch (err) {
        console.error(err);
        return;
    }
};



export const getAllOtc = async (page, data) => {

    try {
        const res = await Call("GET", `/otc/list/${page}/${15}/?search=${data}&purchaseType=otc`, null, 1);
        if (res.success) {
            return res;
        }
        return;
    } catch (err) {
        console.error(err);
        return;
    }
};


export const updateStateOtc = async (id, payload) => {

   
    try {
        const res = await Call("PUT", `/otc/update/${id}`, payload, 1);
        if (res.success) {
            return res;
        }
        return;
    } catch (err) {
        console.error(err);
        return;
    }
};


export const updateStateGiro = async (id,  payload) => {

    try {
        const res = await Call("PUT", `purchase/update/status/${id}`, payload, 1);
        if (res.success) {
            return res;
        }
        return;
    } catch (err) {
        console.error(err);
        return;
    }
};

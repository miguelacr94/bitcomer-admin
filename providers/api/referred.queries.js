import Call from "../../utils/call";



export const getReferredList = async (query) => {

    try {
        const res = await Call("GET", `/user/refer-data`, null, 1);
        if (res.success) {
            return res;
        }
        return;
    } catch (err) {
        console.error(err);
        return;
    }
};


export const sendPaymentReferred = async (userId, file) => {

    try {
        const res = await Call("PUT", `/user/pay-refer/${userId}`, file, 1, 1);
        if (res.success) {
            return res;
        }
        return;
    } catch (err) {
        console.error(err);
        return;
    }
};

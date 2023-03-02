import Call from "../../utils/call";



export const getDetailsSucursal = async (query) => {

    try {
        const res = await Call("GET", `purchase/total-branch/info/${query}`, null, 1);
        if (res.success) {
            return res;
        }
        return;
    } catch (err) {
        console.error(err);
        return;
    }
};

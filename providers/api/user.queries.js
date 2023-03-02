import Call from "../../utils/call";



export const updateUser = async (id, query) => {

    try {
        const res = await Call("PUT", `user/update/info/${id}`, query, 1);
        if (res.success) {
            return res;
        }
        return;
    } catch (err) {
        console.error(err);
        return;
    }
};

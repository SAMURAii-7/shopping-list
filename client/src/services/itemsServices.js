import axios from "axios";
// const apiUrl = "https://shopping-list-tswh.onrender.com/api";
// const apiUrl = "http://localhost:8080/api";
// const apiUrl = "https://tiny-tan-piranha-sari.cyclic.app/api";
const apiUrl = "http://68.233.106.135/api";

export async function getItems(authToken, userId) {
    const res = await axios.get(`${apiUrl}/items`, {
        headers: { authorization: "Bearer " + authToken },
        params: { user_id: userId },
    });
    return res.data;
}

export async function createItem(item, authToken) {
    const res = await axios.post(`${apiUrl}/items/create`, item, {
        headers: { authorization: "Bearer " + authToken },
    });
    return res.status;
}

export function updateItem(item, authToken) {
    return axios.put(`${apiUrl}/items/${item._id}`, item, {
        headers: { authorization: "Bearer " + authToken },
    });
}

export function deleteItem(id, authToken) {
    return axios.delete(`${apiUrl}/items/${id}`, {
        headers: { authorization: "Bearer " + authToken },
    });
}

export async function exportItems(items, authToken) {
    const res = await axios.post(`${apiUrl}/export`, items, {
        headers: { authorization: "Bearer " + authToken },
    });
    return res.data;
}

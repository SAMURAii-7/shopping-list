import axios from "axios";
const apiUrl = "https://shopping-list-backend.up.railway.app/api";

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

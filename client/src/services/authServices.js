import axios from "axios";
// const apiUrl = "https://shopping-list-tswh.onrender.com/api";
const apiUrl = "http://localhost:8080/api";

export async function pingApi() {
    const res = await axios.head(apiUrl);
    return res;
}

export async function login(email, password) {
    const res = await axios.post(`${apiUrl}/auth/login`, { email, password });
    return res;
}

export async function signup(name, email, password) {
    const signUpRes = await axios.post(`${apiUrl}/auth/register`, {
        name,
        email,
        password,
    });
    if (signUpRes.status >= 200 && signUpRes.status < 300) {
        const res = await axios.post(`${apiUrl}/auth/login`, {
            email,
            password,
        }); //auto login after signup
        return res;
    } else return signUpRes.status;
}

export async function forgotPassword(email) {
    const res = await axios.post(`${apiUrl}/auth/forgot-password`, { email });
    return res;
}

export async function resetPassword(id, token, password) {
    const res = await axios.post(
        `${apiUrl}/auth/reset-password`,
        {
            id,
            password,
        },
        { headers: { authorization: "Bearer " + token } }
    );
    return res;
}

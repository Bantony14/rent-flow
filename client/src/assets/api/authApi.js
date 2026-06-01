import axios from "axios"

const API = axios.create({
    baseURL: "http://localhost:5000/api/v1/user"
})

export function userRegistrationApi(data) {
    return API.post("/registeruser", data)
}

export function userLogin(data) {
    return API.post("/userlogin", data, {
        withCredentials: true,
    })
}

export function getMe() {
    return API.get("/me", {
        withCredentials: true,
    })
}

export function userLogout() {
    return API.post("/userlogout", {}, {
        withCredentials: true,
    })
}
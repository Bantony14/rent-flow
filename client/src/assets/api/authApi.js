import axios from "axios"

const API = axios.create({
    baseURL: "http://localhost:5000/api/v1/user"
})

export function userRegistrationApi(data) {
    return API.post("/registeruser", data)
}
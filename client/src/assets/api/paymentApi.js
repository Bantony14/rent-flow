import axios from "axios"

const API = axios.create({
    baseURL: "http://localhost:5000/api/v1/payment",
    withCredentials: true
})

export function paymentOrderCreate() {
    return API.post("/create-order")
} 

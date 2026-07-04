import axios from "axios"

const API = axios.create({
    baseURL: "http://localhost:5000/api/v1/user",
    withCredentials: true
})

export function userRegistrationApi(data) {
    return API.post("/registeruser", data)
}

export function userLogin(data) {
    return API.post("/userlogin", data)
}

export function getMe() {
    return API.get("/me")
}

export function userLogout() {
    return API.post("/userlogout")
}

export function getAllUser(params) {
    return API.get("/getalluser", { params })
}

export function updateUser(id, editData) {
    return API.post(`/userupdate/${id}`, editData)
}

export function deleteUser(id) {
    return API.post(`/userdelete/${id}`)
}

export function getUser(id) {
    return API.post(`/getuser/${id}`,)
}

export function getOneUser(data) {
    return API.post("/getoneuser", data)
}

export function getRoomByBuilding(params) {
    return API.get("/getalluserbybuilding", { params })
}

export function forgotPassword(email) {
    return API.post("/forgotpassword", { email })
}

export function verifyEmailOtp(email, otp) {
    return API.post("/verifyotp", { email, otp })
}

export function resetPassword(email, otp, newPassword, confirmPassword) {
    return API.post("/resetpassword", { email, otp, newPassword, confirmPassword })
}

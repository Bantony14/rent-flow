import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1/room`,
  // baseURL: "http://localhost:5000/api/v1/room",
  withCredentials: true,
});

export function updateRoomAvailability(data) {
  API.patch("/update-room-availability", data);
}

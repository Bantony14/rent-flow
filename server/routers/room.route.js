import express from "express"
import { uploadRoomImage } from "../middlewares/upload.middleware.js";
import { roomAdd } from "../controllers/room.controller.js";

const route = express.Router();

route.post("/roomadd", uploadRoomImage, roomAdd);

export default route;
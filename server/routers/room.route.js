import express from "express"
import { uploadRoomImage } from "../middlewares/upload.middleware.js";
import { roomCreate, roomDetailUpdate, roomImageUpdate } from "../controllers/room.controller.js";

const route = express.Router();

route.post("/roomadd", uploadRoomImage, roomCreate);
route.post("/roomupdate/:id/:imageid", uploadRoomImage, roomImageUpdate)
route.post("/roomdetailupdate/:id", roomDetailUpdate)


export default route;
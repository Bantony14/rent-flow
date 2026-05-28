import express from "express";
import { paymentOrderCreate, verifyPayment } from "../controllers/payment.controller.js";
import { isLoggedIn } from "../middlewares/authUser.js";

const route = express.Router();

route.post("/create-order", isLoggedIn, paymentOrderCreate);
route.post("/verify-payment", isLoggedIn, verifyPayment);

export default route;
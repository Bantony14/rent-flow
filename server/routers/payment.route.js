import express from "express";
import { paymentCheck, paymentOrderCreate, verifyPayment } from "../controllers/payment.controller.js";
import { isLoggedIn } from "../middlewares/authUser.js";

const route = express.Router();

route.post("/create-order", isLoggedIn, paymentOrderCreate);
route.post("/verify-payment", isLoggedIn, verifyPayment);
route.post("/payment-check", paymentCheck);

export default route;
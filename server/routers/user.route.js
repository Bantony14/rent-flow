import express from "express";
import { addMember, forgotPassword, getAllUser, getAllUserByBuilding, getMe, getUser, removeMember, resetPassword, updateMemberInfo, userLogin, userLogout, userRegistration, userUpdate } from "../controllers/user.controller.js";
import { isAuthorized, isLoggedIn } from "../middlewares/authUser.js";

const route = express.Router();

route.post("/registeruser", userRegistration);
route.post("/userlogin", userLogin);
route.post("/userlogout", userLogout);
route.get("/me", isLoggedIn, getMe);
route.post("/userupdate", isLoggedIn, isAuthorized("ADMIN"), userUpdate);
route.get("/getuser", isLoggedIn, isAuthorized("ADMIN"), getUser);
route.get("/getalluser", isLoggedIn, isAuthorized("ADMIN"), getAllUser);
route.get("/getalluserbybuilding", isLoggedIn, isAuthorized("ADMIN"), getAllUserByBuilding);
route.post("/forgotpassword", forgotPassword);
route.post("/resetpassword", resetPassword);
route.put("/addmember", isLoggedIn, isAuthorized("ADMIN"), addMember);
route.put("/removemember/:id", isLoggedIn, isAuthorized("ADMIN"), removeMember);
route.put("/updatemember/:id", isLoggedIn, isAuthorized("ADMIN"), updateMemberInfo);


export default route;
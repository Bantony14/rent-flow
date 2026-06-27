import express from "express";
import { addMember, forgotPassword, getAllUser, getAllUserByBuilding, getMe, getUserById, removeMember, resetPassword, updateMemberInfo, userDelete, userLogin, userLogout, userRegistration, userUpdate, getOneUser } from "../controllers/user.controller.js";
import { isAuthorized, isLoggedIn } from "../middlewares/authUser.js";
import { uploadImages } from "../middlewares/upload.middleware.js";


const route = express.Router();

route.post("/registeruser", uploadImages, userRegistration);
route.post("/userlogin", userLogin);
route.post("/userlogout", userLogout);
route.post("/userdelete/:id", isLoggedIn, isAuthorized("ADMIN"), userDelete);
route.get("/me", isLoggedIn, getMe);
route.post("/userupdate/:id", isLoggedIn, isAuthorized("ADMIN"), uploadImages, userUpdate);
route.post("/getuser/:id", isLoggedIn, isAuthorized("ADMIN"), getUserById);
route.post("/getoneuser", isLoggedIn, isAuthorized("ADMIN"), getOneUser);
route.get("/getalluser", isLoggedIn, isAuthorized("ADMIN"), getAllUser);
route.get("/getalluserbybuilding", isLoggedIn, isAuthorized("ADMIN"), getAllUserByBuilding);
route.post("/forgotpassword", forgotPassword);
route.post("/resetpassword", resetPassword);
route.put("/addmember/:id", uploadImages, addMember);
route.put("/removemember/:id/:memberid", removeMember);
route.put("/updatemember/:id", isLoggedIn, isAuthorized("ADMIN"), updateMemberInfo);


export default route;
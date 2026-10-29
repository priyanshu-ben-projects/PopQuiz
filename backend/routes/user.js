import express from "express";
const router = express.Router();
import handleAsyncError from "../utils/HandleAsyncErrors.js";
import userController from "../controllers/users.js";
import isLoggedIn from "../utils/isLoggedIn.js";


router.route("/register").post(handleAsyncError(userController.signup));

router.route("/logout").post(isLoggedIn, handleAsyncError(userController.logout));

router.route("/login").post(handleAsyncError(userController.login));

router.route("/auth").get(handleAsyncError(userController.auth));

router.route("/edit").post(isLoggedIn, handleAsyncError(userController.updateUser));



export default router;
import express from "express";
import passport from "passport";
const router = express.Router();

import userController from "../controllers/users.js";


router.route("/register").post(userController.signup);

router.route("/logout").post(userController.logout);

router.route("/login").post(userController.login);

router.route("/auth").get(userController.auth);

router.route("/edit").post(userController.updateUser);



export default router;
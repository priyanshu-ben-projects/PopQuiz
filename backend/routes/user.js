import express from "express";
import passport from "passport";
const router = express.Router();

import userController from "../controllers/users.js";


router.route("/register").post(userController.signup);


export default router;
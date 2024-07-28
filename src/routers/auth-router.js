import { Router } from "express";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import {userSignupSchema, userSigninSchema} from  "../validation/user.js"
import validateBody from "../middleware/validateBody.js";
import { refreshController, signinController, signoutController, signupController } from "../controllers/auth.js";
const auth = Router();

auth.post("/register", validateBody(userSignupSchema), ctrlWrapper(signupController));

auth.post("/login", validateBody(userSigninSchema), ctrlWrapper(signinController))

auth.post("/refresh", ctrlWrapper(refreshController));

auth.post("/logout", ctrlWrapper(signoutController))
export default auth;

import { Router } from "express";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import {userSignupSchema, userSigninSchema} from  "../validation/user.js"
import validateBody from "../middleware/validateBody.js";
import { refreshController, signinController, signoutController, signupController } from "../controllers/auth.js";
const authRouter = Router();

authRouter.post("/signup", validateBody(userSignupSchema), ctrlWrapper(signupController));

authRouter.post("/signin", validateBody(userSigninSchema), ctrlWrapper(signinController))

authRouter.post("/refresh", ctrlWrapper(refreshController));

authRouter.post("/signout", ctrlWrapper(signoutController))
export default authRouter;

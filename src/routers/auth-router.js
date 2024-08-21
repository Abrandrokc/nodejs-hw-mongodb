import { Router } from "express";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import { userSignupSchema, userSigninSchema, requestResetEmailSchema, resetPasswordSchema } from "../validation/user.js"
import validateBody from "../middleware/validateBody.js";
import { getGoogleOAuthUrlController, loginWithGoogleController, refreshController, requestResetEmailController, resetPasswordController, signinController, signoutController, signupController } from "../controllers/auth.js";
import { loginWithGoogleOAuthSchema } from "../validation/contactValidation.js";
const authRouter = Router();

authRouter.post("/register", validateBody(userSignupSchema), ctrlWrapper(signupController));

authRouter.post("/login", validateBody(userSigninSchema), ctrlWrapper(signinController))

authRouter.post("/refresh", ctrlWrapper(refreshController));

authRouter.post("/logout", ctrlWrapper(signoutController))
authRouter.post('/send-reset-email', validateBody(requestResetEmailSchema), ctrlWrapper(requestResetEmailController),
);
authRouter.post('/reset-pwd', validateBody(resetPasswordSchema), ctrlWrapper(resetPasswordController),
);
authRouter.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlController));
authRouter.post(
  '/confirm-oauth',
  validateBody(loginWithGoogleOAuthSchema),
  ctrlWrapper(loginWithGoogleController),
);
export default authRouter;


import * as express from 'express';
const router = express.Router();

import { signup, login ,sendCode,forgetPassword,socailLogin} from "./controller/registration.js";
import validation from "../../middleware/validation.js";
import {  signupValidation , loginValidation ,socailLoginValidation } from "./auth.validation.js";

router.post('/register', validation(signupValidation),signup)
router.post("/login",validation(loginValidation) ,login)
router.post("/socailLogin",validation(socailLoginValidation) ,socailLogin)
router.post("/sendCode",sendCode)
router.patch("/forgetPassword",forgetPassword)



export default router
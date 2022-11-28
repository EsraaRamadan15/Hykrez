import * as express from 'express';
const router = express.Router();
import validation from "../../middleware/validation.js";
import  {auth} from "../../middleware/auth.js";
import * as validators from "./user.validation.js";
import { userAuthorization } from "../../general/authorization/authorize.endpoint.js";
import  {myMulter,fileValdation,HME} from "../../service/uploadFile.js";
import { addProfileImage,addCoverImage,followUser,unfollowUser,updateUserProfile,blockUser, uploadDefaultImage} from "./controller/user.controller.js";



router.post("/follow",auth(userAuthorization.endPoint),followUser)
router.post("/unfollow",auth(userAuthorization.endPoint),unfollowUser)
router.patch("/block",auth(userAuthorization.endPoint),blockUser)
router.post("/updateProfile",auth(userAuthorization.endPoint),updateUserProfile)




router.post('/uploadDefaultImage', 
 myMulter('/user',"defaultUserImage", fileValdation.image).single('image'),HME,  uploadDefaultImage)



export default router
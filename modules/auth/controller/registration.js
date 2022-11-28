import pkg from "jsonwebtoken";
const { sign } = pkg;
import { compare, hash } from "bcrypt";
import userModel from "../../../DB/models/userModels/user.js";
import handleDBError from "../../../service/handleError.js";
import ResponseModel from "../../../general/dto/responseModel.js";
import User from "../dto/user.js";
import BasicUserData from "../dto/basicUserDto.js";
import sendEmail from "../../../service/email.js";

const signup = async (req, res) => {
  try {
    const { firstName, lastName, deviceToken, email, password } = req.body;
    const newUser = new userModel({
      firstName,
      lastName,
      deviceToken,
      email,
      password,
      image:"uploads//user/defaultUserImage.png"
    });
    const savedUser = await newUser.save();
    let result = getTokenUserObjectModel(savedUser);
    res.json(new ResponseModel(result, true, ""));
  } catch (error) {
    let message = handleDBError(req, error);
    res.json(new ResponseModel(null, false, message));
  }
};
const socailLogin = async (req, res) => {
  try {
    const { firstName, lastName, deviceToken, email, image } = req.body;
    var userDb = await userModel.findOne({ email: email });
      let imageurl = (image == null || image=='')? "uploads//user/defaultUserImage.png":image;
    if (!userDb) {
      const newUser = new userModel({
        firstName,
        lastName,
        deviceToken,
        email,
        image:imageurl,
        isSocailLogin: true,
      });
      userDb = await newUser.save();
    }
    var result = getTokenUserObjectModel(userDb);
    res.json(new ResponseModel(result, true, ""));
  } catch (error) {
    let message = handleDBError(req, error);
    res.json(new ResponseModel(null, false, message));
  }
};

const login = async (req, res) => {
  const { email, password, deviceToken } = req.body;
  const savedUser = await userModel.findOne({ email });
  if (!savedUser) {
    res
      .status(404)
      .json(new ResponseModel(null, false, "in-valid account email"));
  } else {
    const match = await compare(password, savedUser.password);
    if (!match) {
      res
        .status(400)
        .json(new ResponseModel(null, false, "email password misMatch"));
    } else {
      var result = getTokenUserObjectModel(savedUser);
      res.status(200).json(new ResponseModel(result, true, ""));
    }
  }
};

const sendCode = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      res.json(new ResponseModel(null, fasle, "in-valid email"));
    } else {
      const code = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000); //4589
      await userModel.findByIdAndUpdate(user._id, { code });
      sendEmail(
        "Password Verification",
        user.email,
        `<p>use this code to update u password : ${code}</p>`
      );
      res.json(new ResponseModel(code, true, ""));
    }
  } catch (error) {
    let message = handleDBError(req, error);
    res.json(new ResponseModel(null, false, message));
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { code, email, newPassword } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      res.json(new ResponseModel(null, false, "in-valid email"));
    } else {
      if (user.code != code) {
        res.json(new ResponseModel(null, false, "In-valid auth code"));
      } else {
        const hashedPassword = await hash(
          newPassword,
          parseInt(process.env.saltRound)
        );
        await userModel.findOneAndUpdate(
          { _id: user._id },
          { password: hashedPassword, code: "" }
        );
        res.json(new ResponseModel(true, true, ""));
      }
    }
  } catch (error) {
    res.status(500).json(new ResponseModel(null, false, error.toString()));
  }
};

function getTokenUserObjectModel(savedUser) {
  const token = sign({ id: savedUser._id }, process.env.loginToken);
  let LogedInuser = new User(
    savedUser._id,
    savedUser.firstName,
    savedUser.lastName,
    savedUser.email,
    savedUser.deviceToken,
    savedUser.image,
   savedUser.isSocailLogin,
    savedUser.gender,
    savedUser.countryId,
    savedUser.dealsNumber,
    savedUser.tripsNumber,
    savedUser.avergeRating,
    savedUser.totalRating,
    savedUser.totalTravellerRating,
    savedUser.shipmentOwnerRating,
    0,0,savedUser.isVerified,
    savedUser.phoneNumbers
  );
  LogedInuser.followersNumber = savedUser.follower.length;
  LogedInuser.followingsNumber = savedUser.following.length;
  let result = { token: token, user: LogedInuser };
  return result;
}

function getTokenUserBaseObjectModel(savedUser) {
  const token = sign({ id: savedUser._id }, process.env.loginToken);
  let user = new BasicUserData(
    savedUser._id,
    savedUser.firstName,
    savedUser.lastName,
    savedUser.email,
    savedUser.deviceToken,
    savedUser.image
  );
  let result = { token: token, user: user };
  return result;
}
export { signup, login, sendCode, forgetPassword, socailLogin };

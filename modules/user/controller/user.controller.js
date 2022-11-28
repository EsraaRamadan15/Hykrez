import userModel from "../../../DB/models/userModels/user.js";
import ResponseModel from "../../../general/dto/responseModel.js";


const uploadDefaultImage = async (req, res) => {
  if (req.fileErr) {
    res
      .status(400)
      .json(new ResponseModel(req.file, false, req.t("InvalidFormat")));
  } else {
    var imageURL = `${req.finalDestination}/${req.file.filename}`;
    res
    .status(200)
    .json(new ResponseModel(imageURL, false, req.t("InvalidFormat")));
  }
};

const addProfileImage = async (req, res) => {
  if (req.fileErr) {
    res
      .status(400)
      .json(new ResponseModel(req.file, false, req.t("InvalidFormat")));
  } else {
    var imageURL = `${req.finalDestination}/${req.file.filename}`;
    const filter = { _id: req.userId };
    const update = { personalImage: imageURL };
    let updated = await userModel.findOneAndUpdate(filter, update, {
      new: true,
    });
    if (updated) {
      res.status(200).json(new ResponseModel(imageURL, true, ""));
    } else {
      res
        .status(400)
        .json(new ResponseModel(false, false, req.t("un_Authorized_edit")));
    }
  }
};

const addCoverImage = async (req, res) => {
  if (req.fileErr) {
    res
      .status(400)
      .json(new ResponseModel(req.file, false, req.t("InvalidFormat")));
  } else {
    var imageURL = `${req.finalDestination}/${req.file.filename}`;
    const filter = { _id: req.userId };
    const update = { coverImage: imageURL };
    let updated = await userModel.findOneAndUpdate(filter, update, {
      new: true,
    });
    if (updated) {
      res.status(200).json(new ResponseModel(imageURL, true, ""));
    } else {
      res
        .status(400)
        .json(new ResponseModel(false, false, req.t("un_Authorized_edit")));
    }
  }
};
const followUser = async (req, res) => {
  const { userId } = req.query;
  const followObject = await userModel
    .find({ _id: req.userId, following: { $elemMatch: { $eq: userId } } })
    .select("_id");
  if (userId && followObject.length == 0) {
    await userModel.findByIdAndUpdate(req.userId, {
      $push: { following: userId },
    });
    await userModel.findByIdAndUpdate(userId, {
      $push: { follower: req.userId },
    });
  }
  res.status(200).json(new ResponseModel(true, true, ""));
};
const unfollowUser = async (req, res) => {
  const { userId } = req.query;
  if (userId != null && userId != undefined) {
    await userModel.findByIdAndUpdate(req.userId, {
      $pull: { following: userId },
    });
    await userModel.findByIdAndUpdate(userId, {
      $pull: { follower: req.userId },
    });
    res.status(200).json(new ResponseModel(true, true, ""));
  } else {
    res.status(400).json(new ResponseModel(false, false, "no user id"));
  }
};

const updateUserProfile = async (req, res) => {
  const {
    firstName,
    lastName,
    deviceToken,
    email,
    gender,
    birthDate,
    phone,
    jobTitle,
    specialty,
    businessType,
    city,
    country,
    address,
  } = req.body;

  const filter = { _id: req.userId };
  const update = {
    firstName,
    lastName,
    deviceToken,
    email,
    gender,
    birthDate,
    phone,
    jobTitle,
    specialty,
    businessType,
    city,
    country,
    address,
  };

  let updated = await userModel.findOneAndUpdate(filter, update, {
    new: true,
  });
  if (updated) {
    res.status(200).json(new ResponseModel(true, true, ""));
  } else {
    res.status(400).json(new ResponseModel(false, false, "no user id"));
  }
};

const blockUser = async (req, res) => {
  const { userId } = req.query;

  if (userId != null && userId != undefined) {
    const updateDocument = {
      $pull: { "following": userId, "follower": userId },
      $push: { "blocked": userId }
    };
    await userModel.findByIdAndUpdate(
      req.userId,updateDocument
    );
    res.status(200).json(new ResponseModel(true, true, ""));
  } else {
    res.status(400).json(new ResponseModel(false, false, "no user id"));
  }
};

export {
  addProfileImage,
  addCoverImage,
  followUser,
  unfollowUser,
  updateUserProfile,
  blockUser,
  uploadDefaultImage
};

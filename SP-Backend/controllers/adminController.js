const Admin = require("../models/adminModel");
const {
  hash,
  dehash,
  getRandomCode,
  validPassword,
  genPassword,
  encrypt,
  decrypt,
} = require("../utils/math");
//Created new Admin Account
const newAdmin = async (req, res) => {
  try {
    console.log("Adding New Admin");
    const saltHash = genPassword(req.body.password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newAd = new Admin({
      name: req.body.name,
      username: req.body.username,
      hash: hash,
      salt: salt,
    });

    const adminConfirm = await newAd.save();
    if (adminConfirm) {
      return res.status(201).json({
        status: "ok",
        data: {
          name: newAd.name,
          username: newAd.username,
        },
      });
    }
  } catch (err) {
    console.log("Error occured while registering", err);
    return res.status(500).json({
      status: 500,
      error: `Error Adding User: ${err.message}`,
    });
  }
};

const adminLogin = async (req, res) => {
  //method 1 -> not working
    return res.status(200).json({
      success: true,
      message: "Logged In successfully",
    });

  //method 2
  // const user = await Admin.findOne({username: req.body.username}).exec();
  // if (!user) {
  //   console.log("incorrect Username");
  //   return res.status(404).json({ message: "Incorrect username." });
  // }
  // if (!validPassword(req.body.password, user.hash, user.salt)) {
  //   console.log("incorrect password");
  //   return res.status(402).json({ message: "Incorrect password." });
  // }
  // if (validPassword(req.body.password, user.hash, user.salt)) {
  //   req.login(user._id,function(err){
  //     if(err){
  //       return res.status(500).json({
  //         status: 500,
  //         error: `Error Getting Users: ${err.message}`,
  //       });
  //     }
  //     console.log("Logged in User");
  //     console.log("Account credentials matched");
  //     return res.status(202).json({message: "Logged in Successfully"});
  //   })
  // }  
}

const getAllAdmins = async (req, res) => {
  try {
    const getAllAdmin = await Admin.find({}, ["name", "username"]);
    return res.status(200).json({
      status: "ok",
      data: getAllAdmin,
    });
  } catch (err) {
    console.log("Error getting details of all Admins");
    return res.status(500).json({
      status: 500,
      error: `Error Getting Users: ${err.message}`,
    });
  }
};

const getAdminByUsername = async (req, res) => {
  try {
    const getAdmin = await Admin.find({ username: req.body.username }, [
      "name",
      "username",
    ]);
    return res.status(200).json({
      status: "ok",
      data: getAdmin,
    });
  } catch (err) {
    console.log("Error getting user by username");
    return res.status(500).json({
      status: 500,
      error: `Error Getting User: ${err.message}`,
    });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ username: req.body.username }).exec();
    if (!admin) {
      return res.staus(404).json({
        status: 404,
        error: "User not found",
      });
    }
    await admin.remove();
    return res.status(200).json({
      status: "ok",
      data: {},
    });
  } catch (err) {
    console.log("Error deleting Admin");
    return res.status(500).json({
      status: 500,
      error: `Error Deleting Admin: ${err.message}`,
    });
  }
};

const logoutAdmin = async (req, res) => {
  req.logout();
  req.session.destroy(function (err) {
    res.redirect("/");
  });
};

module.exports = {
  newAdmin,
  adminLogin,
  getAllAdmins,
  getAdminByUsername,
  deleteAdmin,
  logoutAdmin,
};

// Check Admin is Authenticated or not

const ifAdmin = async (req, res, next) => {
  console.log("i am running");
  if (req.isAuthenticated) {
    console.log(req.user);
    next();
  } else {
    res.status(401).json({
      status: 401,
      data: "Permission denied, please Login",
    });
  }
};

module.exports.ifAdmin = ifAdmin;

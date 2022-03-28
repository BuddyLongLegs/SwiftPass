// Check Admin is Authenticated or not

const ifAdmin = async (req, res, next) => {
  console.log("i am running");
  // console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    // console.log(req.user);
    next();
  } else {
    res.status(401).json({
      status: 401,
      data: "Permission denied, please Login",
    });
  }
};

const eachorigin = function (req, res, next) {
  console.log(req.headers.origin);
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin);

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
}

module.exports.ifAdmin = ifAdmin;

module.exports.eachorigin = eachorigin;

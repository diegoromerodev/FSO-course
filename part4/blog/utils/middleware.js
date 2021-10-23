const jwt = require("jsonwebtoken");

const tokenExtractor = (req, res, next) => {
  const bearer = req.get("Authorization");
  if (bearer && bearer.toLowerCase().startsWith("bearer ")) {
    req.token = bearer.split(" ")[1];
  }
  next();
};

const userExtractor = (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);

  if (!decodedToken._id) {
    return res.status(401).json({
      error: "Unable to verify identity",
    });
  }

  req.user = decodedToken;
  next();
};

const routeNotFound = (req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
};

const errorHandler = (err, req, res, next) => {
  let message;
  if (err.name === "ValidationError") {
    message = err.name;
    return res.status(400).json({
      error: message,
    });
  } else if (err.name == "JsonWebTokenError") {
    message = "Invalid token";
    return res.status(401).json({
      error: message,
    });
  }
};

module.exports = {
  routeNotFound,
  errorHandler,
  tokenExtractor,
  userExtractor,
};

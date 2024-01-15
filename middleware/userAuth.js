const jwt = require("jsonwebtoken");

require("dotenv").config();

const secretKey = process.env.KRKO_JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ message: "Unauthorized Token" });

  const authSplit = token.split(" ");

  const [authType, authToken] = [authSplit[0], authSplit[1]];

  if (authType !== "Bearer")
    return res.status(401).json({ message: "Unauthorized Auth Type" });

  jwt.verify(authToken, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "invalid token" });
    }

    req.userId = decoded.userId;
    next(); 
  });
};

const checkAdmin = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) return res.status(401).json({ message: "Unauthorized Token" });

    const authSplit = token.split(" ");

    const [authType, authToken] = [authSplit[0], authSplit[1]];

    if (authType !== "Bearer")
      return res.status(401).json({ message: "Unauthorized Auth Type" });

    
    const decodedToken = await jwt.verify(authToken, secretKey);

    if (!decodedToken.role || decodedToken.role !== "Admin") {
      return res.status(403).json({ error: "Forbidden" });
    }

    req.user = decodedToken; // Attach decoded user object to the request (optional)
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {authMiddleware, checkAdmin};

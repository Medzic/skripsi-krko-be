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

    jwt.verify(authToken, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "invalid token" });
      }
      if (!decoded.role || decoded.role !== "Admin") {
        return res.status(401).json({ message: "Antum bukan admin, silahkan hubungi admin" });
      }
    });

    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { authMiddleware, checkAdmin };

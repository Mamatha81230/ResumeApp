const jwt = require("jsonwebtoken");
const userdb = require("../models/userSchema");
const keysecret = process.env.SECRET_KEY;

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new Error("No token provided");
        }
        const verifytoken = jwt.verify(token, keysecret);
        const rootUser = await userdb.findOne({ _id: verifytoken._id });
        if (!rootUser) {
            throw new Error("User not found");
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;
        next();
    } catch (error) {
        res.status(401).json({ status: 401, message: error.message || "Unauthorized" });
    }
};

module.exports = authenticate;

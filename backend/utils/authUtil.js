const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({
    path: "../.env"
})

const secretKey = process.env.JWT_SECRET;

const setUser = (user)=>{
    return jwt.sign(user, secretKey, { expiresIn: "24h" });
}

const getUser = (token)=>{
    if(!token) return null;
    try {
        return jwt.verify(token, secretKey);
    } catch (err) {
        return null;
    }
}

module.exports = {
    setUser,
    getUser
};


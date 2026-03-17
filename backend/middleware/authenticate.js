const {getUser} = require("../utils/authUtil");

const authenticate = async (req, res, next) => {

    const sessionId = req.cookies.sessionID ;

    if(!sessionId){
        return res.status(401).json({message: "Unauthorized: Login To Continue"});
    }
    try{
        const userDetails = getUser(sessionId);

        req.user = userDetails;
        next();
    }catch(error){
        return res.status(500).json({message: "Internal server error"});
    }

}

exports.authenticate = authenticate;
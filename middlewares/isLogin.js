const JWT = require('jsonwebtoken');

const isLogin = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);
        if (decoded) {
            req.userId = decoded.id;
            req.userName = decoded.userName;
            next();
        } else {
            next("Authentication failed")

        }
    }
    catch {
        next("Authentication failed")
    }
}

module.exports = isLogin;
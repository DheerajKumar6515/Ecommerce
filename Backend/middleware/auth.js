const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const tokenFromHeader = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    const admintoken = req.cookies.admintoken || tokenFromHeader;

    if (!admintoken) {
        return res.status(401).json({ success: false, message: "No token provided." });
    }

    try {
        const decodetoken = jwt.verify(admintoken, process.env.ADMIN_SECRET_KEY);
        if (decodetoken.email === process.env.ADMIN_EMAIL) {
            req.admin = decodetoken;
    
            return next();
        } else {
            return res.status(403).json({ success: false, message: "Access denied. Invalid admin." });
        }
    } catch (err) {
        return res.status(401).json({ success: false, message: "Invalid token." });
    }
};

module.exports = auth;

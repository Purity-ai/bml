// backend/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    try {
        // Get token from Authorization header (Bearer token) or custom token header
        let token = req.headers.authorization?.split(' ')[1] || req.headers.token;

        if (!token) {
            return res.json({ 
                success: false, 
                message: "Not Authorized. Please login again" 
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();

    } catch (error) {
        console.log('Auth Middleware Error:', error.message);
        
        // Handle specific JWT errors
        if (error.name === 'JsonWebTokenError') {
            return res.json({ 
                success: false, 
                message: "Invalid token. Please login again" 
            });
        }
        
        if (error.name === 'TokenExpiredError') {
            return res.json({ 
                success: false, 
                message: "Token expired. Please login again" 
            });
        }
        
        res.json({ 
            success: false, 
            message: error.message 
        });
    }
};

export default authMiddleware;
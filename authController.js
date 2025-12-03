// backend/controllers/authController.js
import jwt from 'jsonwebtoken';

// Hardcoded admin login that generates REAL JWT
const adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Hardcoded admin credentials check
        if (username === 'purity' && password === 'purity') {
            
            // Create a REAL JWT token with admin ID
            const adminId = 'ADM001';
            const token = jwt.sign(
                { id: adminId, role: 'admin' }, 
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );

            return res.json({
                success: true,
                token: token,
                user: {
                    id: adminId,
                    username: username,
                    role: 'admin'
                }
            });
        } else {
            return res.json({
                success: false,
                message: 'Invalid admin credentials'
            });
        }
    } catch (error) {
        console.log('Admin login error:', error);
        res.json({
            success: false,
            message: error.message
        });
    }
};

export { adminLogin };
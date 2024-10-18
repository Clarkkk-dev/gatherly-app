import express from 'express';
import User from '../models/User.js'; // Adjust the path based on your project structure
import { verifyToken } from '../middleware/authMiddleware.js'; // Adjust this import based on your middleware structure

const router = express.Router();

// Get current user details
router.get('/me', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password from response
        if (!user) {
            console.log('User not found with ID:', req.user.id); // Debug log
            return res.status(404).json({ message: 'User not found' });
        }
        console.log('Fetched user:', user); // Debug log
        res.json(user); // Send user details as response
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;

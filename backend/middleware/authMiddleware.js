// import jwt from 'jsonwebtoken';

// export const verifyToken = (req, res, next) => {
//     const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

//     if (!token) {
//         return res.status(401).json({ message: 'Access denied, token missing!' });
//     }

//     try {
//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = verified; // Store the user info in req.user for later use
//         next(); // Proceed to the next middleware or route handler
//     } catch (error) {
//         res.status(400).json({ message: 'Invalid token', error: error.message });
//     }
// };

import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // Ensure header exists and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized, no token provided' });
    }

    // Extract token from the "Bearer <token>" format
    const token = authHeader.split(' ')[1];

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded user:', decoded); // Debug log
        req.user = decoded; // Attach the decoded user to the request object
        next();
    } catch (error) {
        console.error('Token verification error:', error); // Log the error
        return res.status(401).json({ message: 'Unauthorized, invalid token' });
    }
};

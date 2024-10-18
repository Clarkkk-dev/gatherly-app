
import express from 'express';
import FamilyGroup from '../models/FamilyGroup.js';
import User from '../models/User.js'; // Import User model
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to create a new family group
router.post('/create', verifyToken, async (req, res) => {
    console.log(req.user); // Check if `name` and `id` are present
    const { family_name, photo, unique_code } = req.body;
    const user_id = req.user.id; 
    const full_name = req.user.name; 

    try {
        const existingFamilyGroup = await FamilyGroup.findOne({ unique_code });
        if (existingFamilyGroup) {
            return res.status(400).json({ message: 'Unique code already exists' });
        }

        const newFamilyGroup = new FamilyGroup({
            family_name,
            photo,
            unique_code,
            members: [{ user_id, full_name }],
        });

        await newFamilyGroup.save();
        res.status(201).json({ message: 'Family group created successfully', familyGroup: newFamilyGroup });
    } catch (error) {
        console.error('Error creating family group:', error); 
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Route to get the family group of the logged-in user
router.get('/mine', verifyToken, async (req, res) => {
    try {
        // Find the family group where the logged-in user is a member
        const familyGroup = await FamilyGroup.findOne({ 'members.user_id': req.user.id });
        
        if (!familyGroup) {
            return res.status(404).json({ message: 'No family group found for this user' });
        }

        res.status(200).json({ familyGroup });
    } catch (error) {
        console.error('Error fetching family group:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Route to join an existing family group
router.post('/join', verifyToken, async (req, res) => {
    const { unique_code } = req.body;
    const user_id = req.user.id; 
    const full_name = req.user.name; 

    try {
        const familyGroup = await FamilyGroup.findOne({ unique_code });

        if (!familyGroup) {
            return res.status(404).json({ message: 'Family group not found' });
        }

        // Check if the user is already a member
        const isMember = familyGroup.members.some(member => member.user_id === user_id);
        if (isMember) {
            return res.status(400).json({ message: 'You are already a member of this family group' });
        }

        // Add the user to the family group members
        familyGroup.members.push({ user_id, full_name });
        await familyGroup.save();

        // Add the family group to the user's joinedFamilyGroups
        await User.findByIdAndUpdate(user_id, {
            $addToSet: { joinedFamilyGroups: familyGroup._id } // Add family group ID to joinedFamilyGroups
        });

        res.status(200).json({ message: 'Successfully joined the family group', familyGroup });
    } catch (error) {
        console.error('Error joining family group:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Route to get all family groups joined by the user
router.get('/joined', verifyToken, async (req, res) => {
    const userId = req.user.id; 

    try {
        // Find user with populated joinedFamilyGroups
        const user = await User.findById(userId).populate('joinedFamilyGroups');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ familyGroups: user.joinedFamilyGroups });
    } catch (error) {
        console.error('Error fetching joined family groups:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


// Route to fetch events for a specific family group
router.get('/events', verifyToken, async (req, res) => {
    const familyId = req.query.familyId; // Get familyId from query params

    try {
        // Fetch events associated with the given family group ID
        const events = await Event.find({ family_group_id: familyId }).populate('user_id', 'full_name'); // Assuming you want to populate with user details
        res.status(200).json({ events });
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default router;


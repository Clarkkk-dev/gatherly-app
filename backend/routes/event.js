import express from 'express';
import mongoose from 'mongoose';
import FamilyGroup from '../models/FamilyGroup.js';
import Event from '../models/Event.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

const validateEventCreation = [
    body('unique_code').notEmpty().withMessage('Unique code is required'),
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('date').isISO8601().withMessage('Valid date is required'),
];

const validateEventUpdate = [
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('description').optional().notEmpty().withMessage('Description cannot be empty'),
    body('date').optional().isISO8601().withMessage('Valid date is required'),
];

const sendErrorResponse = (res, status, message, error) => {
    console.error(message, error);
    return res.status(status).json({ message });
};

router.get('/', verifyToken, async (req, res) => {
    try {
        const events = await Event.find({});
        res.status(200).json({ events });
    } catch (error) {
        sendErrorResponse(res, 500, 'Error fetching events', error);
    }
});

router.get('/family-group/:familyGroupId', verifyToken, async (req, res) => {
    const { familyGroupId } = req.params;
    const user_id = req.user.id;
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 10);

    try {
        const familyGroup = await FamilyGroup.findById(familyGroupId);
        if (!familyGroup) {
            return res.status(404).json({ message: 'Family group not found' });
        }

        const isMember = familyGroup.members.some(member => member.user_id.toString() === user_id);
        if (!isMember) {
            return res.status(403).json({ message: 'You are not a member of this family group' });
        }

        const events = await Event.find({ family_group_id: familyGroup._id })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const totalEvents = await Event.countDocuments({ family_group_id: familyGroup._id });

        res.status(200).json({
            events,
            totalPages: Math.ceil(totalEvents / limit),
            currentPage: Number(page),
        });
    } catch (error) {
        sendErrorResponse(res, 500, 'Error fetching events', error);
    }
});

router.post('/create', verifyToken, validateEventCreation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { unique_code, title, description, date } = req.body;
    const user_id = req.user.id;
    const full_name = req.user.full_name;

    try {
        const familyGroup = await FamilyGroup.findOne({ unique_code });

        if (!familyGroup) {
            return res.status(404).json({ message: 'Family group not found' });
        }

        const isMember = familyGroup.members.some(member => member.user_id.toString() === user_id);
        if (!isMember) {
            return res.status(403).json({ message: 'You are not a member of this family group' });
        }

        const max_members = 100;
        if (familyGroup.members.length > max_members) {
            return res.status(400).json({ message: `Family group has too many members (limit: ${max_members})` });
        }

        const newEvent = new Event({
            family_group_id: familyGroup._id,
            user_id,
            title,
            description,
            date,
            interested: familyGroup.members.slice(0, max_members).map(member => ({
                user_id: member.user_id,
                isInterested: false
            })),
            createdAt: new Date(),
        });

        await newEvent.save();

        familyGroup.events.push({
            event_id: newEvent._id,
            user_id: user_id,
            title,
        });

        await familyGroup.save();

        res.status(201).json({
            message: 'Event created successfully',
            event: newEvent,
            full_name,
        });
    } catch (error) {
        sendErrorResponse(res, 500, 'Error creating event', error);
    }
});

router.put('/edit/:eventId', verifyToken, validateEventUpdate, async (req, res) => {
    const { title, description, date } = req.body;
    const user_id = req.user.id;
    const { eventId } = req.params;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (event.user_id.toString() !== user_id) {
            return res.status(403).json({ message: 'You are not authorized to edit this event' });
        }

        event.title = title || event.title;
        event.description = description || event.description;
        event.date = date || event.date;

        await event.save();

        res.status(200).json({ message: 'Event updated successfully', event });
    } catch (error) {
        sendErrorResponse(res, 500, 'Error updating event', error);
    }
});

router.delete('/delete/:eventId', verifyToken, async (req, res) => {
    const user_id = req.user.id;
    const { eventId } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({ message: 'Invalid event ID' });
        }

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (event.user_id.toString() !== user_id) {
            return res.status(403).json({ message: 'You are not authorized to delete this event' });
        }

        const familyGroup = await FamilyGroup.findByIdAndUpdate(
            event.family_group_id,
            { $pull: { events: { event_id: eventId } } },
            { new: true }
        );
        if (!familyGroup) {
            return res.status(404).json({ message: 'Family group not found' });
        }

        await Event.findByIdAndDelete(eventId);

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        sendErrorResponse(res, 500, 'Error deleting event', error);
    }
});

export default router;

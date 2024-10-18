import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    family_group_id: { type: mongoose.Schema.Types.ObjectId, ref: 'FamilyGroup', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    interested: [{
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        isInterested: { type: Boolean, default: false }
    }],
    created_at: { type: Date, default: Date.now }
});

const Event = mongoose.model('Event', EventSchema);

export default Event;

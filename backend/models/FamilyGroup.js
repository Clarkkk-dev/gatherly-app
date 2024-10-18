// import mongoose from 'mongoose';

// const FamilyGroupSchema = new mongoose.Schema({
//     family_name: { type: String, required: true },
//     photo: { type: String },
//     unique_code: { type: String, required: true, unique: true },
//     members: [{
//         user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//         full_name: { type: String, required: true },
//     }],
//     events: [{
//         event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }, // References the events in the Event collection
//         user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Who created the event
//         title: { type: String, required: true } // Event title for quick reference
//     }],

//     // chat app
//     mensahe: [{
//         msname: {
//             type: String,
//             required: true,
//         },
//         message: {
//             type: String,
//             required: true,
//         },
//         ava: {
//             type: String,
//             required: true,
//         },
//         timestamp: {
//             type: Date,
//             default: Date.now,
//         },
//     }]
//     // chat app end

// });

// const FamilyGroup = mongoose.model('FamilyGroup', FamilyGroupSchema);

// export default FamilyGroup;


import mongoose from 'mongoose';

const FamilyGroupSchema = new mongoose.Schema({
    family_name: { type: String, required: true, index: true },
    photo: { 
        type: String, 
        validate: /^(http|https):\/\/[^ "]+$/, 
        required: false 
    },
    unique_code: { 
        type: String, 
        required: true, 
        unique: true, 
        index: true 
    },
    members: [{
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        full_name: { type: String, required: true },
    }],
    events: [{
        event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }, 
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
        title: { type: String, required: true }
    }],
    
    // Chat app
    mensahe: [{
        msname: { type: String, required: true },
        message: { type: String, required: true },
        ava: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
    }]
});

const FamilyGroup = mongoose.model('FamilyGroup', FamilyGroupSchema);

export default FamilyGroup;

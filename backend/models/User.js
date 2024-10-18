// // models/User.js
// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//     full_name: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true, 
//     },
//     password: {
//         type: String,
//         required: true,
//     },
// }, { timestamps: true });

// const User = mongoose.model('User', userSchema);

// export default User;


import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, 
    },
    password: {
        type: String,
        required: true,
    },
    joinedFamilyGroups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FamilyGroup' }] // Add this line
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;

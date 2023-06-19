const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    emailId: { type: String, required: true, unique: true },
    password: { type: String, default: "" },
    dob: { type: String, default: "" },
    age: { type: String, default: "" },
    profilePicture: { type: String, default: "" },
    created_at_date: { type: Date, default: "" },
    updated_at_date: { type: Date, default: "" }
},
    {
        timestamps: true
    }
)

const User = mongoose.model('Users', userSchema, 'users')
module.exports = User;


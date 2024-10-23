const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    model: { type: String, required: true },
    sequence: { type: Number, default: 0 },
});

const Counter = mongoose.model('Counter', counterSchema);

const userSchema = new mongoose.Schema(
    {
        id: { type: Number, unique: true },
        userName: { type: String, required: true },
        accountNumber: { type: Number, unique: true, required: true, index: true },
        emailAddress: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        identityNumber: { type: String, required: true, unique: true, index: true },
    },
    { timestamps: true }
);

userSchema.pre('save', async function(next) {
    if (this.isNew) {
        const counter = await Counter.findOneAndUpdate(
            { model: 'User' },
            { $inc: { sequence: 1 } }, 
            { new: true, upsert: true }
        );

        this.id = counter.sequence; 
    }
    next();
});

module.exports = mongoose.model('User', userSchema);

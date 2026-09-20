import mongoose from "mongoose"




export type UserRole = 'user' | 'admin'

const addressSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    postalCode: {
        type: String,
        required: true,
        trim: true
    },
    isDefault: {
        type: Boolean,
        default: false
    },

}, {
    timestamps: false
})

export const userSchema = new mongoose.Schema({
    clerkUserId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        require: true,

    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    points: {
        type: Number,
        default: 0
    },
    address: {
        type: [addressSchema],
        default: []
    },

}, {
    timestamps: true
})


export const User = mongoose.models.User || mongoose.model('User', userSchema)
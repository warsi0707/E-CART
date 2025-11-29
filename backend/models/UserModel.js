import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN','SELLER'],
        default: 'USER'
    },
    password: {type: String, required: true},
    firstName: {type: String},
    lastName: {type: String},
    mobile: {type: String},
    addresses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    }],
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }]
})

const User = mongoose.model('User', userSchema)
export default User;
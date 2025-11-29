import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {type: String, required: true},
    price: {type: Number, required: true},
    images: [{type: String}],
    category: {type: String, required: true},
    discount : {type: Number, default: 0},
    stock : {type: Number, min:0},
    status: {
        type: String,
        enum: ['ACTIVE','INACTIVE'],
        default: 'ACTIVE'
    },
    review: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Product = mongoose.model('Product', productSchema)

export default Product;
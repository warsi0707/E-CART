import mongoose from "mongoose"

const reviewSchema = new mongoose.Schema({
    rate: {
        type: Number,
        min: 0,
        max: 5
    },
    comment: {type: String},
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
})

const Review = mongoose.model('Review', reviewSchema)

export default Review
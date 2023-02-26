import mongoose from "mongoose";

const category = mongoose.Schema({
    category_name: {
        type: String,
        required: true,
    },
})

export default mongoose.model('Categories', category)
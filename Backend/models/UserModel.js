import mongoose from "mongoose";

const User = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
})

export default mongoose.model('Users', User)
import mongoose from "mongoose";

const Quiz = mongoose.Schema({
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    quiz_name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    images_cover: {
        type: String,
        required: true,
    },
    // author_quiz: {
    //     type: String,
    //     required: true,
    // },
    rating: {
        type: Number,
        required: true,
    }
})

export default mongoose.model('Quizzes', Quiz)
import mongoose from "mongoose";

const Questions = mongoose.Schema({
    quiz_id: {
        type: String,
        required: true,
    },
    question_type: {
        type: String,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    option_1: {
        type: String,
        required: false,
    },
    option_2: {
        type: String,
        required: false,
    },
    option_3: {
        type: String,
        required: false,
    },
    option_4: {
        type: String,
        required: false,
    },
    correct_answer: {
        type: String,
        required: true,
    },
    attachment_url: {
        type: String,
        required: false,
    },
    score: {
        type: Number,
        required: true,
    },
    time: {
        type: Number,
        required: true,
    },
})

export default mongoose.model('Questions', Questions)
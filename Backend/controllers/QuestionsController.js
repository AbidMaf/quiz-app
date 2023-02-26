import Questions from "../models/QuestionsModel.js";

export const getQuestions = async(req, res) => {
    try {
        const questions = await Questions.find();
        res.status(200).json(questions);
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}

export const getQuestionById = async(req, res) => {
    try {
        const question = await Questions.findById(req.params.id);
        res.json(question);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}

export const getQuestionByQuizId = async(req, res) => {
    try{
        const question = await Questions.find({quiz_id: req.params.quiz});
        res.json({
            question_size: question.length,
            data: {question}
        });
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}

export const saveQuestion = async(req, res) => {
    const question = new Questions(req.body);
    try {
        const insertedQuestion = await question.save();
        res.status(201).json(insertedQuestion);
    } catch(error) {
        res.status(400).json({message: error.message});
    }
}

export const updateQuestion = async(req, res) => {
    try {
        const updatedQuestion = await Questions.updateOne({_id: req.params.id}, {$set: req.body});
        res.status(200).json(updatedQuestion);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}

export const deleteQuestion = async(req, res) => {
    try {
        const deletedQuestion = await Questions.deleteOne({_id: req.params.id});
        res.status(200).json(deletedQuestion)
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}
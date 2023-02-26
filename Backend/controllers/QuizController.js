import Quiz from "../models/QuizModel.js";

export const getQuizzes = async(req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}

export const getQuizById = async(req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        res.json(quiz);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}

export const getQuizJoinByCategory = async(req, res) => {
    try{
        const quiz = await Quiz.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "category_id",
                    foreignField: "_id",
                    as: "category"
                }
            }
        ])
        res.json(quiz);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}

export const getQuizByCategory = async(req, res) => {
    try{
        const quiz = await Quiz.find({category_id: req.params.category});
        // const quiz = await Quiz.aggregate([
        //     {
        //         $lookup: {
        //             from: "categories",
        //             localField: "category_id",
        //             foreignField: "_id",
        //             as: "category"
        //         }
        //     }
        // ])
        res.json(quiz);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}

export const getQuizByName = async(req, res) => {
    try {
        const quiz = await Quiz.find({quiz_name: {$regex: `(.*)${req.params.search}(.*)`}});
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}

export const saveQuiz = async(req, res) => {
    const quiz = new Quiz(req.body);
    try {
        const insertedQuiz = await quiz.save();
        res.status(201).json(insertedQuiz);
    } catch(error) {
        res.status(400).json({message: error.message});
    }
}

export const updateQuiz = async(req, res) => {
    try {
        const updatedQuiz = await Quiz.updateOne({_id: req.params.id}, {$set: req.body});
        res.status(200).json(updatedQuiz);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}

export const deleteQuiz = async(req, res) => {
    try {
        const deletedQuiz = await Quiz.deleteOne({_id: req.params.id});
        res.status(200).json(deletedQuiz)
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}
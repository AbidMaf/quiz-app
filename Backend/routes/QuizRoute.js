import express from "express";
import {
    getQuizzes,
    getQuizById,
    getQuizJoinByCategory,
    getQuizByCategory,
    getQuizByName,
    saveQuiz,
    updateQuiz,
    deleteQuiz
} from "../controllers/QuizController.js";

const router = express.Router();

// router.get('/quiz', getQuizzes);
router.get('/quiz/:id', getQuizById);
router.get('/quiz', getQuizJoinByCategory);
router.get('/quiz/search/:search', getQuizByName);
router.post('/quiz', saveQuiz);
router.patch('/quiz/:id', updateQuiz);
router.delete('/quiz/:id', deleteQuiz);

export default router;
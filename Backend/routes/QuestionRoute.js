import express from "express";
import {
    getQuestions,
    getQuestionById,
    getQuestionByQuizId, 
    saveQuestion,
    updateQuestion,
    deleteQuestion
} from "../controllers/QuestionsController.js";

const router = express.Router();

router.get('/question', getQuestions);
router.get('/question/:id', getQuestionById);
router.get('/quiz/question/:quiz', getQuestionByQuizId);
router.post('/question', saveQuestion); 
router.patch('/question/:id', updateQuestion);
router.delete('/question/:id', deleteQuestion);

export default router;
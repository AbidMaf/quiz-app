import express from "express";
import {
    getCategories,
    getCategoryById,
    saveCategory,
    deleteCategory
} from "../controllers/CategoryController.js"; 

const router = express.Router();

router.get('/category', getCategories);
router.get('/category/:id', getCategoryById);
router.post('/category', saveCategory);
router.delete('/category/:id', deleteCategory);

export default router;
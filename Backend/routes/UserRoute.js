import express from "express";
import {
    getUsers,
    getUserById,
    saveUser,
} from "../controllers/UserController.js"; 

const router = express.Router();

// router.get('/user', getUsers);
router.get('/user/:id', getUserById);
router.post('/user', saveUser);

export default router;
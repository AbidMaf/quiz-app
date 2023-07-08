
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import QuizRoute from "./routes/QuizRoute.js";
import CategoryRoute from "./routes/CategoryRoute.js";
import QuestionRoute from "./routes/QuestionRoute.js";

const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/quiz', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to Database'));

app.use(cors())
app.use(express.json())
app.use(UserRoute)
app.use(QuizRoute)
app.use(CategoryRoute)
app.use(QuestionRoute)

app.listen(5000, () => console.log('Server Started'));

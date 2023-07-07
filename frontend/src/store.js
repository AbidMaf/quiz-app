import { configureStore } from '@reduxjs/toolkit'
import quizReducer from "./slice/quiz"

const reducer = {
    quiz: quizReducer
}

const store = configureStore({
    reducer: reducer,
    devTools: true,
})

export default store;
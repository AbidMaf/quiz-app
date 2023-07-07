import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    isLoading: false,
    isRejected: false, 
    isFulfilled: false,
    quizData: [],
    questionData: [],
    categoryData: [],
}

export const getQuiz = createAsyncThunk('quiz/getQuiz', async () => {
    try{
        const res = await axios.get('http://localhost:5000/quiz')
        return res.data
    }catch(e){
        console.log(e)
    }
})

export const getQuestionByQuiz = createAsyncThunk('quiz/getQuestionByQuiz', async (id) => {
    try{
        const res = await axios.get(`http://localhost:5000/quiz/question/${id}`)
        return res.data.data
    }catch(e){
        console.log(e)
    }
})

const handleQuiz = createSlice({
    name: 'quiz',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getQuiz.pending, (state) => {
            state.isLoading = true
            state.isRejected = false
            state.isFulfilled = false
        })
        builder.addCase(getQuiz.fulfilled, (state, action) => {
            state.isLoading = false
            state.isFulfilled = true
            state.isRejected = false
            state.quizData = action.payload
        })
        builder.addCase(getQuiz.rejected, (state) => {
            state.isLoading = false
            state.isRejected = true
            state.isFulfilled = false
        })
        builder.addCase(getQuestionByQuiz.pending, (state) => {
            state.isLoading = true
            state.isRejected = false
            state.isFulfilled = false
        })
        builder.addCase(getQuestionByQuiz.fulfilled, (state, action) => {
            state.isLoading = false
            state.isFulfilled = true
            state.isRejected = false
            state.questionData = action.payload
        })
        builder.addCase(getQuestionByQuiz.rejected, (state) => {
            state.isLoading = false
            state.isRejected = true
            state.isFulfilled = false
        })
    }
})

export default handleQuiz.reducer
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { getQuestionByQuiz } from "../../slice/quiz";
import { AiFillStar, AiFillClockCircle, AiFillQuestionCircle, AiFillPlayCircle } from "react-icons/ai";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-image: linear-gradient(to right top, #180e1b, #1d1021, #221126, #28112c, #2f1031, #310f34, #330e37, #350d3a, #320d3c, #2e0d3e, #2a0d40, #250d42);
    margin: 0;
    height: 100vh;
    padding: 0 8vw;
    color: #fff;
`

const QuizInfo = styled.div`
    display: grid; 
    grid-template-columns: auto 1fr 1fr 1fr .5fr; 
    grid-template-rows: 1fr 1fr; 
    grid-template-areas: 
        "Profile-Picture Title Title Title Start-Button"
        "Profile-Picture Rating Total-Questions Total-Durations Start-Button"; 
    justify-content: center; 
    align-content: center; 
    justify-items: center; 
    align-items: center; 
    padding: 0;
    margin: 4vh 12vw;

    /* From https://css.glass */
    background: rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-sizing: content-box !important;
`

const ProfilePicture = styled.img`
    grid-area: Profile-Picture;
    max-width: 12vw;
    aspect-ratio: 1 / 1;
    border-radius: 16px 0 0 16px;
    object-fit: cover;
    justify-self: flex-end;
`

const QuizTitle = styled.h2`
    grid-area: Title;
    align-self: flex-end;
    justify-self: flex-start;
    margin-left: 2vw;
`

const QuizRating = styled.div`
    grid-area: Rating;
    align-self: center;
    justify-self: flex-start;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5vw;
    font-size: 1.2rem;
    margin-left: 2vw;
`

const QuizTotalQuestions = styled.div`
    grid-area: Total-Questions;
    align-self: center;
    justify-self: flex-start;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5vw;
    font-size: 1.2rem;
`

const TotalDurations = styled.div`
    grid-area: Total-Durations;
    align-self: center;
    justify-self: flex-start;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5vw;
    font-size: 1.2rem;
`

const StartButton = styled.button`
    grid-area: Start-Button;
    width: 100%;
    height: 100%;
    border-radius: 0 16px 16px 0;
    background-color: #20c97a;
    border: none;
    cursor: pointer;
`

const UsernameForm = styled.div`
    margin: 4vh 12vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const UsernameInput = styled.input`
    width: 90%;
    outline: none;
    color: #fff;
    padding: .8rem 1.6rem;
    /* From https://css.glass */
    background: rgba(255, 255, 255, 0.2);
    border-radius: 8px 0 0 8px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);
`

const UsernameSubmit = styled.button`
    max-width: 20%;
    width: fit-content;
    border-radius: 0 8px 8px 0;
    background-color: #fff;
    border: 1px solid #fff;
    cursor: pointer;
    padding: .8rem 1.6rem;
    color: #000;
`

const Quiz = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [totalDuration, setTotalDuration] = useState(0);
    const quiz = useSelector(state => state.quiz.quizData);
    const questions = useSelector(state => state.quiz.questionData) || null;
    const questionLoadState = useSelector(state => state.quiz);
    const [selectedQuiz, setSelectedQuiz] = useState([])
    const navigate = useNavigate(); 

    useEffect(() => {
        dispatch(getQuestionByQuiz(id))
    }, [])

    useEffect(() => {
        const getSelectedQuiz = quiz.find((item) => item._id === id)
        setSelectedQuiz(getSelectedQuiz)
        console.log(questions)
    }, [questionLoadState.isFulfilled])

    useEffect(() => {
        if(questionLoadState.isFulfilled !== false) {
            const totalDuration = questions?.question?.reduce((total, item) => { 
                return total + item.time
            }, 0)
            setTotalDuration(totalDuration)
        }
    }, [questionLoadState])

    const startQuiz = (e) => {
        e.preventDefault();
        navigate(`/quiz/${id}/question`)
    }

    return (
        <Container>
            <UsernameForm>
                <UsernameInput type="text" placeholder="your name here"/>
                <UsernameSubmit>Submit</UsernameSubmit>
            </UsernameForm>
            <QuizInfo>
                <ProfilePicture src={selectedQuiz.images_cover} />
                <QuizTitle>{selectedQuiz.quiz_name}</QuizTitle>
                <QuizRating>
                    <AiFillStar color="#ffe138" />
                    <span>{selectedQuiz.rating} Rating</span>
                </QuizRating>
                <QuizTotalQuestions>
                    <AiFillQuestionCircle color="#27f785" />
                    <span>{questions?.question?.length} Questions</span>
                </QuizTotalQuestions>
                <TotalDurations>
                    <AiFillClockCircle color="#e300f7" />
                    <span>{totalDuration} Seconds</span>
                </TotalDurations>
                <StartButton onClick={(e) => startQuiz(e)}>
                    <AiFillPlayCircle color="#fff" style={{ fontSize: '32px' }} />
                </StartButton>
            </QuizInfo>
        </Container>
    )
}

export default Quiz;
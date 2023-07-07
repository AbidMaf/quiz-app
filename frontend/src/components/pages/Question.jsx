import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { getQuestionByQuiz } from "../../slice/quiz";
import { QuestionCard } from "../organism";
import Form from 'react-bootstrap/Form';
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai"

const Container = styled.div`
    background-image: linear-gradient(to right top, #180e1b, #1d1021, #221126, #28112c, #2f1031, #310f34, #330e37, #350d3a, #320d3c, #2e0d3e, #2a0d40, #250d42);
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 8vw;
`

const CardContainer = styled.div`
    display: grid; 
    grid-template-columns: 1fr 1fr; 
    grid-template-rows: 1fr 1fr 1fr; 
    gap: 0px 0px; 
    justify-content: center; 
    align-content: center; 
    justify-items: center; 
    align-items: center;  

    /* From https://css.glass */
    background: rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-sizing: content-box !important;

    padding: 3vw;
`

const QuizQuestion = styled.div`
    color: #fff;
    justify-self: stretch; 
    grid-area: 1 / 1 / 2 / 3;
`

const FormGrid = styled(Form)`
    justify-self: stretch; 
    align-self: stretch; 
    grid-area: 2 / 1 / 4 / 3;
`

const OptionContainer = styled.div`
    justify-self: stretch; 
    align-self: stretch; 
    grid-area: 2 / 1 / 4 / 3;

    display: grid; 
    grid-template-columns: 1fr 1fr; 
    grid-template-rows: 1fr 1fr; 
    gap: 0px 0px; 
    grid-template-areas: 
        "Option-A Option-B"
        "Option-C Option-D"; 
    justify-content: center; 
    align-content: center; 
    justify-items: center; 
    align-items: center; 
`

const OptionA = styled.div`
    grid-area: Option-A;
`

const OptionB = styled.div`
    grid-area: Option-B;
`

const OptionC = styled.div`
    grid-area: Option-C;
`

const OptionD = styled.div`
    grid-area: Option-D;
`

const ShortAnswer = styled.div`
    justify-self: stretch; 
    grid-area: 2 / 1 / 3 / 3; 
    display: flex;
    flex-direction: row;
`

const AnswerInput = styled.input`
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

const AnswerSubmit = styled.button`
    max-width: 20%;
    width: fit-content;
    border-radius: 0 8px 8px 0;
    background-color: #fff;
    border: 1px solid #fff;
    cursor: pointer;
    padding: .8rem 1.6rem;
    color: #000;
`

const RadioButton = styled(Form.Check)`
    padding: 2.8em 3.6em;
    background-color: #fff;
`

const AlertContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    margin: 2vh auto;
    flex-direction: row;
    align-items: center;
    gap: 16px;
    width: fit-content;
    border-radius: 16px;
    padding: 8px 16px;
`

const AnswerInfo = styled.div`
    display: flex;
    flex-direction: column;
`

const ResultContainer = styled.div`
    display: grid; 
    grid-template-columns: 1fr 1fr; 
    grid-template-rows: 1fr 1fr 1fr; 
    gap: 0px 0px; 
    grid-template-areas: 
        "Heading Heading"
        ". ."
        "Back-button Back-button"; 
    justify-content: center; 
    align-content: center; 
    justify-items: center; 
    align-items: center; 

    /* From https://css.glass */
    background: rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-sizing: content-box !important;

    color: #fff;
    padding: 3vw;
`

const ResultHeading = styled.div`
    grid-area: Heading;
`

const BackButton = styled.a`
    grid-area: Back-button;

    background-color: #670a92;
    color: #fff;
    text-decoration: none;
    font-size: 1.2rem;
    padding: .8rem 1.6rem;
    border-radius: .6em;
    margin-top: 2vh;
    cursor: pointer;
    display: inline-block;
    transition: .3s;
    &:hover {
        background-color: #860c96;
        transform: translateY(-10%);
        -webkit-box-shadow: 0px 4px 0px 0px #590a7e;
        -moz-box-shadow: 0px 4px 0px 0px #590a7e;
        box-shadow: 0px 4px 0px 0px #590a7e;
    }
`

const Question = () => {
    const quiz = useSelector(state => state.quiz.quizData);
    const questions = useSelector(state => state.quiz.questionData) || null;
    const [questionIndex, setQuestionIndex] = useState(0);
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [disableInput, setDisableInput] = useState(false);
    const [showAnswer, setShowAnswer] = useState({
        show: false,
        isWrong: false,
        correctAnswer: ""
    });
    const [fillAnswer, setFillAnswer] = useState("");
    const [quizResult, setQuizResult] = useState({
        correct: 0,
        wrong: 0
    });
    const [quizCompleted, setQuizCompleted] = useState(false);

    const AnswerAlert = () => {
        return (
            <AlertContainer style={{display: showAnswer.show == false ? 'none' : 'flex'}}>
                {
                    showAnswer.isWrong ? (
                        <AiFillCloseCircle color="#ec6565" style={{ fontSize: '48px' }} />
                    ) : (
                        <AiFillCheckCircle color="#48eb51" style={{ fontSize: '48px' }} />
                    )
                }
                <AnswerInfo>
                    <h4>{showAnswer.isWrong ? "Wrong Answer" : "Right Answer"}</h4>
                    <span>Correct answer: {showAnswer.correctAnswer}</span>
                </AnswerInfo>
            </AlertContainer>
        )
    }

    const checkAnswer = ({answer, correct_answer}) => {
        setDisableInput(true);
        setShowAnswer({
            show: true,
            isWrong: answer.toLowerCase() !== correct_answer.toLowerCase(),
            correctAnswer: correct_answer
        });
        setQuizResult({
            correct: answer.toLowerCase() === correct_answer.toLowerCase() ? quizResult.correct + 1 : quizResult.correct,
            wrong: answer.toLowerCase() !== correct_answer.toLowerCase() ? quizResult.wrong + 1 : quizResult.wrong
        })
        setTimeout(() => {
            if(questionIndex === questions.question.length - 1) {
                setQuizCompleted(true);
                return;
            }
            setQuestionIndex(questionIndex + 1);
            console.log(questionIndex)
            setDisableInput(false);
            setShowAnswer({
                show: false,
                isWrong: false,
                correctAnswer: ""
            })
            setFillAnswer("")
        }, 1000);
    }

    return (
        <Container>
            {
                quizCompleted ? (
                    <ResultContainer>
                        <ResultHeading>
                            <h2>Quiz Completed</h2>
                            <span>Result:</span>
                        </ResultHeading>
                        <h4>Correct: <span style={{color: "#48eb51"}}>{quizResult.correct}</span></h4>
                        <h4>Wrong: <span style={{color: "#ec6565"}}>{quizResult.wrong}</span></h4>
                        <BackButton onClick={() => navigate(`/`)}>Back to Home</BackButton>
                    </ResultContainer>
                ) : (
                    questions?.question?.map((item, index) => {
                        if(index == questionIndex) {
                            return (
                                <>
                                    <AnswerAlert />
                                    <CardContainer>
                                        <QuizQuestion>{item.question}</QuizQuestion>
                                        {
                                            item.question_type === "pilihan ganda" ?
                                            (
                                                <FormGrid>
                                                    {['radio'].map((type) => (
                                                        <OptionContainer key={`inline-${type}`} className="mb-3">
                                                            <OptionA>
                                                                <label>
                                                                    <RadioButton inline disable={disableInput} type={type} label={item.option_1} value={item.option_1} name={`question${questionIndex}`} id={`inline-${type}-1`} onChange={(e) => checkAnswer({answer: e.target.value, correct_answer: item.correct_answer})} />
                                                                </label>
                                                            </OptionA>
                                                            <OptionB>
                                                                <label>
                                                                    <RadioButton inline disable={disableInput} type={type} label={item.option_2} value={item.option_2} name={`question${questionIndex}`} id={`inline-${type}-2`} onChange={(e) => checkAnswer({answer: e.target.value, correct_answer: item.correct_answer})} />
                                                                </label>
                                                            </OptionB>
                                                            <OptionC>
                                                                <label>
                                                                    <RadioButton inline disable={disableInput} type={type} label={item.option_3} value={item.option_3} name={`question${questionIndex}`} id={`inline-${type}-3`} onChange={(e) => checkAnswer({answer: e.target.value, correct_answer: item.correct_answer})} />
                                                                </label>
                                                            </OptionC>
                                                            <OptionD>
                                                                <label>
                                                                    <RadioButton inline disable={disableInput} type={type} label={item.option_4} value={item.option_4} name={`question${questionIndex}`} id={`inline-${type}-4`} onChange={(e) => checkAnswer({answer: e.target.value, correct_answer: item.correct_answer})} />
                                                                </label>
                                                            </OptionD>
                                                        </OptionContainer>
                                                    ))}
                                                </FormGrid>
                                            ) : (
                                                <ShortAnswer>
                                                    <AnswerInput type="text" placeholder="Answer" value={fillAnswer} onChange={(e) => setFillAnswer(e.target.value)} />
                                                    <AnswerSubmit onClick={() => checkAnswer({answer: fillAnswer, correct_answer: item.correct_answer})}>Submit</AnswerSubmit>
                                                </ShortAnswer>
                                            )
                                        }
                                    
                                    </CardContainer>
                                </>
                            )
                        }
                    })
                )   
                
            }
        </Container>
    )
}

export default Question
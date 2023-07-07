import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { getQuiz } from '../../slice/quiz'; 
import { QuizLibraryCard } from "../organism";

const Container = styled.div`
    height: fit-content;
    text-align: center;
    color: #fff;
    padding: 0 8vw;
`

const HeaderSection = styled.div`
    
`

const Title = styled.h1`
    margin: 0;
`

const ShortDesc = styled.h4`
    font-weight: 400;
    margin-bottom: 3vh;
`

const LibrarySection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3vh;
`

const QuizSection = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1vw;
    margin-bottom: 5vh;
`

const Clickable = styled(Link)`
    text-decoration: none;
`

const CategoryTitle = styled.span`
    font-weight: 400;
    width: fit-content;
    font-size: 1.5rem;
`

const QuizLibrary = () => {
    const dispatch = useDispatch();
    const quiz = useSelector(state => state.quiz.quizData);
    const [category, setCategory] = useState([])

    useEffect(() => {
        dispatch(getQuiz())
        .then(() => {
            console.log(quiz)
        })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:5000/category')
        .then(res => {
            setCategory(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <> 
            <Container id="quizSection">
                <HeaderSection>
                    <Title>Start Your Journey</Title>
                    <ShortDesc>Take the quiz and improve your skill</ShortDesc>
                </HeaderSection>
                {
                    category.map((item, index) => {
                        return (
                            <LibrarySection>
                                {
                                    quiz.find(i => i.category_id === item._id) && (
                                        <CategoryTitle>{item.category_name.charAt(0).toUpperCase() + item.category_name.slice(1)}</CategoryTitle>
                                    )
                                }
                                <QuizSection>
                                    {
                                        quiz.map((i, index) => {
                                            if(item._id === i.category_id){
                                                return (
                                                    <Clickable to={`/quiz/${i._id}`}>
                                                        <QuizLibraryCard key={index} quiz_name={i.quiz_name} images_cover={i.images_cover} rating={i.rating} />
                                                    </Clickable>
                                                )
                                            }
                                        })
                                    }
                                </QuizSection>
                            </LibrarySection>
                        )
                    })
                } 
            </Container>
        </>
    )
}

export default QuizLibrary;
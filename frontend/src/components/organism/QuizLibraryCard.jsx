import React from "react";
import styled from "styled-components";
import { AiFillStar } from "react-icons/ai";

const Container = styled.div`
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    transition: .3s;
    /* From https://css.glass */
    background: rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);

    &:hover {
        /* From https://css.glass */
        background: rgba(255, 255, 255, 0.3);
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(7.1px);
        -webkit-backdrop-filter: blur(7.1px);
        border: 1px solid rgba(255, 255, 255, 0.62);
        transform: translateY(-3%);

        -webkit-box-shadow: 0px 10px 13px -7px rgba(255, 255, 255, 0.3), 5px 10px 11px 3px rgba(255,255,255,0.3); 
        box-shadow: 0px 10px 13px -7px rgba(170, 170, 170, 0.3), 0px 10px 11px 3px rgba(141, 141, 141, 0.3);
    }
`

const ImageCover = styled.img`
    width: 1fr;
    max-width: c;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 10px;
`

const QuizInfo = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas: 
        "quiz_name quiz_name"
        "rating total_questions"
    ;
    align-items: center;
    padding: 1vh 1vw;
    color: #fff;
`

const QuizName = styled.span`
    font-weight: 500;
    display: inline-block;
    width: fit-content;
    grid-area: quiz_name;
`

const Rating = styled.div`
    grid-area: rating;
    width: fit-content;
    font-weight: 400;
    gap: 8px;
    font-size: 1rem;
`

const QuizLibraryCard = ({quiz_name, images_cover, rating}) => {
    return (
        <>
            <Container>
                <ImageCover src={images_cover} />
                <QuizInfo>
                    <QuizName>{quiz_name}</QuizName>
                    <Rating><AiFillStar color="#ffe138"/>{rating}</Rating>
                </QuizInfo>
            </Container>
        </>
    )
}

export default QuizLibraryCard
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import illustration from "../../assets/illustration.svg";

const Container = styled.div`
    padding: 0 8vw;
    color: #fff;
    height: 100vh;
    display: grid;
    grid-template-columns: 3fr 3fr;
    grid-template-rows: 2.8fr 3.2fr;
    grid-template-areas:
    "Header Illustration"
    "Description Illustration";
    justify-content: center;
    align-items: center;
    grid-column-gap: 2vw;
`

const HeaderSection = styled.div`
    align-self: flex-end;
    grid-column-start: 1;
    grid-area: Header;
    text-align: left;
`

const DescriptionSection = styled.div`
    align-self: flex-start;
    grid-column-start: 1;
    grid-area: Description;
    text-align: left;
`

const IllustrationSection = styled.div`
    /* background-color: green; */
    grid-column-start: 2;
    grid-area: Illustration;
`

const Title = styled.h1`
    font-size: 3rem;
    line-height: 1.2em;
    font-weight: 600;
    margin: 0;
`

const Description = styled.p`
    font-size: 1.2rem;
    line-height: 1.5em;
    font-weight: 400;
`

const CTABtn = styled.a`
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

const Header = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <HeaderSection>
                <Title>Challenge Yourself with the Ultimate Quiz Experience!</Title>
            </HeaderSection>
            <DescriptionSection>
                <Description>Take on the ultimate quiz challenge that tests your knowledge, entertains, and inspires. Start now and see how far you can go!</Description>
                <CTABtn href="#quizSection">Join the Fun</CTABtn>
            </DescriptionSection> 
            <IllustrationSection>
                <object type="image/svg+xml" data={illustration} style={{width: "100%", height: "100%"}}></object>
            </IllustrationSection>
        </Container>
    )
}

export default Header;
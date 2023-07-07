import React from "react";
import { Navbar } from "../organism";
import { Header, QuizLibrary } from "../template" 
import styled from "styled-components";

const Background = styled.div`
    background-image: linear-gradient(to right top, #180e1b, #1d1021, #221126, #28112c, #2f1031, #310f34, #330e37, #350d3a, #320d3c, #2e0d3e, #2a0d40, #250d42);
`

const Home = () => {
    return (
        <Background>
            <Navbar />
            <Header />
            <QuizLibrary />
        </Background>
    )
}

export default Home;
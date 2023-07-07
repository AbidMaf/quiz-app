import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    /* From https://css.glass */
    background: rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-sizing: content-box !important;
`

const QuestionCard = (props) => {
    const [questionIndex, setQuestionIndex] = useState(0);

    useEffect(() => {
        console.table(props.data)
    }, []) 

    return (
        <>
            {
                {/* props?.data?.map((item, index) => {
                    if(index == questionIndex) {
                        return (
                            <Container>
                                <div>
                                    <p>{item.question}</p>
                                    <p>{item.answer}</p>
                                </div>
                            </Container>
                        )
                    }
                }) */}
            }
        </>
    )
}

export default QuestionCard
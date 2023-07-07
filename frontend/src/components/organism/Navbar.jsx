import React from "react"
import styled from "styled-components"
import {
    Link, NavLink
} from "react-router-dom"
import logo from "../../assets/logo.svg";

const Container = styled.div`
    z-index: 99;
    position: fixed;
    width: 84vw;
    margin: 0 auto;
    left: 0;
    right: 0;
    margin-top: 3vh;
    color: #fff;
    /* From https://css.glass */
    background: rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(13.5px);
    -webkit-backdrop-filter: blur(13.5px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    /* End from https://css.glass */
    height: 8vh;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const LinksSection = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    gap: 2rem;
    margin-right: 8vw;
`

const Logo = styled.div`
    margin-left: 8vw;
    display: flex;
    align-items: center;
`

const NavLinkItem = styled(NavLink)`
    color: #fff;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    transition: .3s;
    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
`

const Navbar = () => {
    return (
        <Container> 
            <Logo>
                <object type="image/svg+xml" data={logo} style={{width: "2rem", height: "2rem", marginRight: "0.5rem"}}></object>
                <span>eclipse</span>
            </Logo>
            <LinksSection>
                <NavLinkItem>Home</NavLinkItem>
                <NavLinkItem>Profile</NavLinkItem>
            </LinksSection>
        </Container>
    )
}

export default Navbar
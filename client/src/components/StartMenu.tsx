import * as React from "react"
import logo from './logo.svg';
import { Container } from "@mui/material";
import { Box } from "@mui/material";


function Start_Menu() {
    return(
    <Container>
        <img src={'./cards/2_of_clubs.png'} className="App-logo" alt="logo" />   
        <img src={'./cards/ace_of_clubs.png'} className="App-logo" alt="logo" />   
    </Container>
    )
}

export default Start_Menu;
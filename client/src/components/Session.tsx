// Single game session

import { Button, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Board from "./Board";
import Game from "./Game";

interface SessionInputs {
    name: string
}

interface GameResults {
    playerCards: number[];
    dealerCards: number[];
    playerScore: number;
    dealerScore: number;
    playerWin: boolean;
}

function Session ({name}: SessionInputs) {

    const [money, setMoney] = useState<number>(100);             // Amount of user money for the session
    const [maxScore, setMaxScore] = useState<number>(100);       // Make it to the leaderboard
    const [active, setActive] = useState<boolean>(false);        // actve status for the game
    const [bet, setBet] = useState<number>(0);                   // Bet amount for the game
    const [gameResults, setGameResults] = useState<GameResults>({
        playerCards: [],
        dealerCards: [],
        playerScore: 0,
        dealerScore: 0,
        playerWin: false
    });

    const export_results = (results: GameResults):any => {
        setGameResults(results);
        setActive(false);
    }

    const export_max_score = (maxScore: number): any => {

        // Construct URL params
        let data = new URLSearchParams();
        data.append("name", name);
        data.append("score", maxScore.toString());

        // Send score to Leaderboard
        const postData = async () => {
            const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: data
            };
            const response = await fetch('http://localhost:4000/leaderboard', requestOptions);
            const json =  await response.json();
            console.log(json);
        }
        postData();
    }

    // Post Game session Handler
    useEffect(() => {
        if(gameResults.playerWin) setMoney(money+2*bet);
        if(gameResults.playerWin && money+2*bet > maxScore) setMaxScore(money+2*bet);
        if(!gameResults.playerWin && money==0) export_max_score(maxScore);
    }, [gameResults]);


    const refreshPage = () => {
        window.location.reload();
    }


    const get_static_board = (results: GameResults): any => (            // JSX type return 
        <Board 
            playerCards={results.playerCards}
            dealerCards={results.dealerCards}
            playerScore={results.playerScore}
            dealerScore={results.dealerScore}
            name={name}
        ></Board>
    );

    return(
        <Container>
            {
                active? 
                <Game export_results={export_results} name={name}/>
                :
                <>
                {
                    get_static_board(gameResults)
                }
                <Typography variant="h5" sx={{mt:-.5}} color="primary">Round Over {gameResults.playerWin? "You Win" : "Dealer Win"}</Typography>
                <br/>
                {
                    money!=0?
                    <>
                    <TextField sx={{ mb:1 }} color="primary" id="standard-basic" type={"number"} label="Bet Amount" variant="standard"
                    onChange={event => {
                        const bet_amt: number = parseInt(event.target.value);
                        if (bet_amt > money) {
                            return;
                        }
                        setBet(bet_amt);
                    }}
                    />
                    <br/>
                    <Button color="primary" variant="contained" onClick={()=> {
                        if (bet > money) {
                            return;
                        }
                        setMoney(money-bet);
                        setActive(true);
                    }}>Bet</Button>
                    </>
                    :
                    <></>
                }
                </>
            }
            <br/>
            {
                money==0 && !active?
                <>
                    <Typography variant="h4" sx={{mt:-5}} color="primary">Game Over!</Typography>
                    <Button color="primary" sx={{mb:2.5}} variant="contained" onClick={()=> {refreshPage()}}>Exit Session</Button>
                </>
                :
                <></>
            }
            <br></br>
            <Typography variant="h4" sx={{mt:-.5}} color="primary">Money:{
                money
            }
            </Typography>
            <br></br>
            <Typography variant="h4" sx={{mt:-.5}} color="primary">Max Score: {
                maxScore
            }
            </Typography>
            <br></br>
        </Container>
    )
};


export default Session;
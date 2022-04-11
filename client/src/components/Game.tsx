// Wrap betting and each round

import { Button, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {calculate_score, check_bust, shuffle} from '../Logic';
import Board from "./Board";

interface GameResults {
    playerCards: number[];
    dealerCards: number[];
    playerScore: number;
    dealerScore: number;
    playerWin: boolean;
}

interface GameInputs {
    name: string;
    export_results: (results: GameResults) => any;
}


function Game({name, export_results}: GameInputs) 
{
    const deck = shuffle(Array.from(Array(52).keys()));

    const [dealerCards, setDealerCards] = useState<number[]>([]);   // No cards for player at init
    const [playerCards, setPlayerCards] = useState<number[]>([]);   // No cards for player at init

    const [playerScore, setPlayerScore] = useState<number>(0);      // Local game score for player
    const [dealerScore, setDealerScore] = useState<number>(0);      // Game score from cards for dealer

    // Init game
    useEffect(() => {
        console.log("deck in useEffect() = ", deck);
        const dealer_card1: any = deck.pop();
        const dealer_card2: any = deck.pop();
        const player_card1: any = deck.pop();
        const player_card2: any = deck.pop();
        console.log("deck in useEffect() = ", deck);
        setPlayerCards((playerCards) => [...playerCards, player_card1]);
        setPlayerCards((playerCards) => [...playerCards, player_card2]);
        setDealerCards((dealerCards) => [...dealerCards, dealer_card1]);
        setDealerCards((dealerCards) => [...dealerCards, dealer_card2]);
    }, []);
    
    useEffect(() => {
        setPlayerScore(calculate_score(playerCards));
        setDealerScore(calculate_score(dealerCards));
    }, [playerCards, dealerCards]);
    
    // Might change score to be handled in board
    // or passed as props

    // Called once hit button clicked
    const hit = () => {
        const random_card: any = deck.pop();
        setPlayerCards((playerCards) => [...playerCards, random_card]);
        if(check_bust([...playerCards, random_card]))
        {
            console.log("Dealer Wins");
            export_results({
                playerCards: [...playerCards, random_card],
                dealerCards: dealerCards,
                playerScore: calculate_score([...playerCards, random_card]),
                dealerScore: calculate_score(dealerCards),
                playerWin: false
            });
        }
    };

    // Called once stand button clicked
    const stand = () => { 

        // Dealer resolve varibales
        var dealer_resolve_score = dealerScore;
        var draw_limiter = 0;
        var dealer_resolve_hand: number[] = dealerCards;

        // Game resolve loop for dealer
        while(1) 
        {
            // Check dealer win
            if(dealer_resolve_score > playerScore && dealer_resolve_score <= 21){
                console.log("Dealer win, You lose!");
                export_results({
                    playerCards: playerCards,
                    dealerCards: dealer_resolve_hand,
                    playerScore: calculate_score(playerCards),
                    dealerScore: dealer_resolve_score,
                    playerWin: false
                });
                break;
            }

            // Draw dealer card
            const random_card: any = deck.pop();
            dealer_resolve_hand.push(random_card);
            dealer_resolve_score = calculate_score(dealer_resolve_hand);

            // Check dealer bust
            if(check_bust(dealer_resolve_hand))
            {
                console.log("Dealer busted, You Win!");
                export_results({
                    playerCards: playerCards,
                    dealerCards: dealer_resolve_hand,
                    playerScore: calculate_score(playerCards),
                    dealerScore: dealer_resolve_score,
                    playerWin: true
                });
                break;
            }

            // Draw limit is 10
            draw_limiter+=1;
            if(draw_limiter > 10) {
                export_results({                       // Draw limit deafault to user win
                    playerCards: playerCards,
                    dealerCards: dealer_resolve_hand,
                    playerScore: calculate_score(playerCards),
                    dealerScore: dealer_resolve_score,
                    playerWin: true
                });
                break;
            } 
        }
    };

    return(
        <>
        <Board 
            playerCards={playerCards}
            dealerCards={dealerCards}
            playerScore={playerScore}
            dealerScore={dealerScore}
            name={name}
        />
        <Container>
            <Button color="primary" variant="contained" sx={{ mr:2.5 }} onClick={() => hit()}>Hit</Button>
            <Button color="primary" variant="contained" sx={{ ml:2.5 }}onClick={() => stand()}>Stand</Button>
        </Container>
        </>
    )
}

export default Game;
import { Container, Box, Typography } from "@mui/material";
import card_data from '../card_data.json';
import PlayCard from "./PlayCard";

interface BoardInputs {
    name: string;
    playerCards: number[];
    dealerCards: number[];
    playerScore: number;
    dealerScore: number;
}

function Board({name, playerCards, dealerCards, playerScore, dealerScore}: BoardInputs) {
    return (
        <Container>
        <Typography variant="h4" sx={{mt:5}} color="primary">{name}'s Hand: {playerScore}</Typography>
        <Box
            sx={{
            display: 'flex',
            flexDirection: 'row',
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
            borderRadius: 1,
            }}
        >
        {
            playerCards.map((card,i)=> (
                <PlayCard key={i} img_src={card_data[card].file_name}/>
            ))
        }
        </Box>
        <br/>
        <Typography variant="h4" sx={{mt:-2}} color="primary">Dealer's Hand: {dealerScore}</Typography>
        <Box
            sx={{
            display: 'flex',
            flexDirection: 'row',
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
            borderRadius: 1,
            }}
        >
        {
            dealerCards.map((card,i) => (
                <PlayCard key={i} img_src={card_data[card].file_name}/>
            ))
        }
        </Box>

        </Container>
    )
};

export default Board;
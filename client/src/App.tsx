import { useState } from 'react';
import './App.css';
import Start_Menu from './components/StartMenu'
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import Session from './components/Session';
import Leaderboard from './components/Leaderboard';


function App() {
    const [name, setName] = useState<string>("Your Name");
    const [playing, setPlaying] = useState<boolean>(false);

    // Handle input errors for name, reflect on entry field by adding error tag
    // if(not error) render normal non error input field
    // if error() render error input field

    return (
      <div>
      <div className="App">
        <header className="App-header">
          {
            playing? 
            <>
            <Session name={name}/>
            </>
            : 
            <>
              <Typography variant="h4" justifySelf={"center"} color="primary">
                Blackjack
              </Typography>
              <Start_Menu/>
                <Box
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                <TextField id="standard-basic" type="text" label="Name" color="primary" variant="filled"
                  onChange={event => {
                    const { value } = event.target;
                    setName(value);
                  }}
                />
                  <div>
                    <Button color="primary" variant="contained"  onClick={() => setPlaying(true)}>Play</Button>
                  </div>
                  <Typography variant="h5" justifySelf={"center"} color="primary">
                    Welcome {name}!
                    
                    </Typography>
                </Box>
              </>
          }
          </header>
      </div>
      <Leaderboard/>
    </div>
  );
}

export default App;

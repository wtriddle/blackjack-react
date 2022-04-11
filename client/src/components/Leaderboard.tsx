import { useEffect, useState } from 'react';
import moment from 'moment';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

// Column headers for Leaderboard 
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'updatedAt', headerName: 'Last Played', width: 130 },
  { field: 'createdAt', headerName: 'First Played', width: 130 },
  {
    field: 'score',
    headerName: 'score',
    type: 'number',
    width: 90,
  },
];

// Fields from the database
export interface LeaderBoardInterface {
  id: number;
  name: string;
  score: number;
  createdAt: string;
  updatedAt: string;
}

function Leaderboard() {
    const [error, setError] = useState(null);           // Error logic
    const [isLoaded, setIsLoaded] = useState(false);    // Spinner Logic
    const [items, setItems] = useState<Array<LeaderBoardInterface>|undefined>(undefined);
  
    // Leadearboard Fetch
    useEffect(() => {
      const fetchData =async () => {
        try {
          // Get leaderboard data from backend
          const response = await fetch("http://localhost:4000/leaderboard");
          const json =  await response.json();
          console.log(json);
          // Pre-process data and give to client data structures when recieved
          if(json)
          {
            // convert item dates to readable strings
            console.log("items = ", json);
            console.log("items = ", json[0].createdAt);
            console.log("items = ", moment(json[0].createdAt).format('DD MMM, YYYY'));
            // Convert date strings to readable format
            const test:Array<LeaderBoardInterface> = json.map((obj:any) => {
                return {
                  ...obj, 
                  createdAt:moment(obj.createdAt).format('DD MMM, YYYY'),
                updatedAt:moment(obj.createdAt).format('DD MMM, YYYY')
              }
            });
            console.log("items = ", test);
            setItems(test);
          }
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }, [])
  
    return(  
      <>
      {items ?   
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={items}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>: 0}
      </>
    );
}

export default Leaderboard;
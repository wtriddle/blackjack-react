/* Back end server to handle leaderboard */
import { AppDataSource } from "./data-source"
import { Leaderboard } from "./entity/Leaderboard"
import * as express from "express";
import {Request , Response} from 'express';
import * as cors from "cors";


AppDataSource.initialize().then(async () => {
    
    console.log("Here you can setup and run express / fastify / any other framework.")
    const app = express(); 
    app.use(cors('*'));     // Allow client to request data 
    const bodyParser = require('body-parser');
    const urlencodedParser = bodyParser.urlencoded({ extended: false });
    
    app.get("/", urlencodedParser, async function(req: Request, res: Response) {
        // Return default html page
        return res.send("Welcome to the server handler for the leaderboard");
    });

    app.get("/leaderboard", urlencodedParser, async function(req: Request, res: Response) {
        // Return all users on the leaderboard
        const results = await AppDataSource.manager.find(Leaderboard);
        return res.send(results);
    });

    app.post("/leaderboard", urlencodedParser, async function(req: Request, res: Response) {
        const attempt_find = await AppDataSource.manager.findOne(Leaderboard, {where: {"name" : req.body.name}});
        console.log("posting: ", req.body);
        if(attempt_find)
        {
            // Handle Update of score by name
            if(attempt_find.score >= parseInt(req.body.score)) return;         // Dont update a lower score
            attempt_find.score = req.body.score;
            const results = await AppDataSource.manager.save(attempt_find);
            return res.send(results);
        }
        else {
            // Handle Create of new player with name and score
            const new_player = new Leaderboard();
            new_player.name = req.body.name;
            new_player.score = req.body.score;
            const results = await AppDataSource.manager.save(new_player);
            return res.send(results);
        }
    });

    app.listen(4000, () => {
        console.log("Server running at 4000")
    });

    
}).catch(error => console.log(error))


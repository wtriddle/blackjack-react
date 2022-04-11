import "reflect-metadata"
import { DataSource } from "typeorm"
import { Leaderboard } from "./entity/Leaderboard"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [Leaderboard],
    migrations: [],
    subscribers: [],
})

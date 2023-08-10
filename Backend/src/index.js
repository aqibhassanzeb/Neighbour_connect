import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';


import './config.js';
import Auth from "./routes/auth_routes.js";
import lostandFound from "./routes/lostfound_routes.js";
import * as path from 'path';
import { fileURLToPath } from 'url';


const app = express();
dotenv.config();

//middelwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: true,
    credentials: true,
    defaultErrorHandler: false,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//All APi's Endponits
app.use('/api/v1', Auth,lostandFound)

app.use('*', (req, res) => {
    return res.status(404).json({
        message: 'Backend is runing..'
    })
});

//Port
const port = process.env.PORT || 3333;
const nodeServer = app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

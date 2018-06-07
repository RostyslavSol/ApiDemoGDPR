require('dotenv').config();

import { Request, Response } from "express";
import * as http from "http";

import app from "./app";

const port = process.env.APP_PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => console.log(`API localhost:${port}`));

export default server;

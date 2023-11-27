import express from "express";
import { db } from "./db/config.js";
import indexRouter from './routes/indexRouter.js'
import taskRouter from './routes/taskRouter.js'
import cors from 'cors'
import { socket } from "./core/socketIO.js";

const app = express();

app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST" ,"PUT"],
  credentials: true
}))
app.use('/',indexRouter)
app.use('/task',taskRouter)

const server=app.listen(3000, () => {
  console.log("Server started ");
});

socket(server)
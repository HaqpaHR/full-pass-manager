import express from "express";
import mongoose from "mongoose";
import config from "config";
import authRouter from "./routes/auth.routes";
import cors from "./middleware/cors.middleware"
import PassRoutes from "./routes/pass.routes";

const app = express();

const PORT = config.get('serverPort')

app.use(cors)
app.use(express.json())
app.use('/', authRouter)
app.use('/', PassRoutes)

const start = async () => {
    try {
        await mongoose.connect(config.get('dbUrl'))
        app.listen(PORT, () => {
            console.log('Server started', PORT)
        })
    } catch (e) {}
};

start()

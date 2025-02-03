import cors from "cors";
import express from "express";
import morgan from "morgan";
import rootRouter from "./route/index";

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(rootRouter);

export default app;
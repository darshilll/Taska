import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import dbConnection from "./utils/index.js";
import { errorHandler, routeNotFound } from "./middlewares/errorMiddlewares.js";
import routes from "./routers/index.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

dbConnection();

const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cookieParser());
// app.use(
//   cors({
//     origin: ["http://localhost:8800"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use("/api", routes);

//USE THE CLIENT APP
app.use(express.static(path.join(__dirname, "/client/dist")));

//RENDER CLIENT
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/client/dist/index.html"))
);

app.use(routeNotFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

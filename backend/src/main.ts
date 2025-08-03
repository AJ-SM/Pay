import express from "express";
import { userRoute } from "./routes/userRoutes";
import cors from "cors"

const app = express();

app.use(cors());
app.use(express.json())

app.use('/user',userRoute);



app.listen(3000);
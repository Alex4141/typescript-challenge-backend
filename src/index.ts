import express from "express";
import StaysRouter from "./routes/stays";
import ReviewsRouter from './routes/reviews';

const port = 3000;
const app = express();

app.use(express.json());
app.use("/stays", StaysRouter);
app.use("/reviews", ReviewsRouter);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

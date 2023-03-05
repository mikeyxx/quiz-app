require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("express-async-errors");
const path = require("path");

const app = express();
const authRouter = require("./routes/auth");
const userAuth = require("./middleware/authenticate");
const questionsRouter = require("./routes/questions");
const errorHandlerMiddleware = require("./middleware/errorHandler");
const notFound = require("./middleware/not-found");
const connectDB = require("./db/connect");

app.use(express.json());
app.use(cors());
// app.use(
//   cors({
//     origin: ["http://localhost:3000", "https://smartypants.cyclic.app"],
//   })
// );

app.use("/api/v1/auth", authRouter);
app.use("/api/v1", userAuth, questionsRouter);

app.use(express.static(path.join(__dirname, "./client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/dist/index.html"));
});

app.use(errorHandlerMiddleware);
app.use(notFound);

const port = process.env.PORT || 3000;

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
};

start();

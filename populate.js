require("dotenv").config();

const Questions = require("./model/questions");
const connectDB = require("./db/connect");
const jsonData = require("./questions.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Questions.deleteMany();
    await Questions.create(jsonData);
    console.log("Success!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();

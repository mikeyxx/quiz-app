const Question = require("../model/questions");
const { StatusCodes } = require("http-status-codes");

const getQuestions = async (req, res) => {
  const questions = await Question.find({});
  res.status(StatusCodes.OK).json({ questions });
};

module.exports = getQuestions;

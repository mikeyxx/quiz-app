const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  answer: [
    {
      option: {
        type: String,
        required: true,
      },
      correct: {
        type: Boolean,
        required: true,
      },
    },
  ],
});

const Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;

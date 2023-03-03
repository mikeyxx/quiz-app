const { StatusCodes } = require("http-status-codes");
const CustomErrorAPI = require("./custom-arrors");

class NotFound extends CustomErrorAPI {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFound;

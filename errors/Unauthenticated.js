const CustomErrorApi = require("./custom-arrors");
const { StatusCodes } = require("http-status-codes");

class UnauthenticatedError extends CustomErrorApi {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;

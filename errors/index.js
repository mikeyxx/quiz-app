const BadRequestError = require("../errors/BadRequest");
const NotFound = require("../errors/Not-Found");
const CustomErrorAPI = require("../errors/custom-arrors");
const UnauthenticatedError = require("../errors/Unauthenticated");

module.exports = {
  BadRequestError,
  NotFound,
  CustomErrorAPI,
  UnauthenticatedError,
};

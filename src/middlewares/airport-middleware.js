// Keep checks and validation in middlewares.
const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateCreateRequest(req, res, next) {
  if (!req.body.name) {
    ErrorResponse.message =
      "Something went wrong creating airport (middleware)";

    ErrorResponse.error = new AppError([
      "Name not found in incoming request",
      StatusCodes.BAD_REQUEST,
    ]);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.code) {
    ErrorResponse.message =
      "Something went wrong creating airport (middleware)";

    ErrorResponse.error = new AppError([
      "Airport code not found in incoming request",
      StatusCodes.BAD_REQUEST,
    ]);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.cityID) {
    ErrorResponse.message = "Something went wrong creating airport(middleware)";

    ErrorResponse.error = new AppError([
      "CityId not found in incoming request",
      StatusCodes.BAD_REQUEST,
    ]);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

module.exports = { validateCreateRequest };

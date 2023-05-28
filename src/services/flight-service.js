const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {
    const flight = await flightRepository.create(data);
    return flight;
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      let explanation = [];
      // errors is an array inside error object . errors is an array of objects.
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      console.log(explanation); // Will tell exact reason to developer why it failed.
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    console.log(error);
    throw new AppError(
      "Cannot create new instance of Flight(Service Layer)",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createFlight,
};

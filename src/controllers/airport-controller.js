const { AirportService } = require("../services");

const { StatusCodes, INTERNAL_SERVER_ERROR } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

/**
 * 
 *POST: /airports
 req-body {name: '', code:'', address:'', cityId:''}
 */

async function createAirport(req, res) {
  try {
    // Controller redirect req to services.
    const airport = await AirportService.createAirport({
      name: req.body.name,
      code: req.body.code,
      address: req.body.address,
      cityID: req.body.cityID,
    });
    // structuring response in controllers.
    SuccessResponse.data = airport;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);

    // return res.status(StatusCodes.CREATED).json({
    //   success: true,
    //   message: "Successfully created airplane",
    //   data: airplane,
    //   error: {},
    // });
  } catch (error) {
    // structuring response in controllers.
    ErrorResponse.error = error;
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    // Earlier error code was hardcoded, now we can see what error , airplane service has sent.
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getAirports(req, res) {
  try {
    const airports = await AirportService.getAirports();
    SuccessResponse.data = airports;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;

    return res.status(error.statusCode).json(ErrorResponse);
  }
}

/*

GET: airplanes/:id
req-body {}
*/

async function getAirport(req, res) {
  try {
    const airport = await AirportService.getAirport(req.params.id);
    SuccessResponse.data = airport;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;

    return res.status(error.statusCode).json(ErrorResponse);
  }
}

/*

DELETE: airplanes/:id
req-body {}
*/
async function destroyAirport(req, res) {
  try {
    const response = await AirportService.destroyAirport(req.params.id);
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function updateAirport(req, res) {
  try {
    const response = await AirportService.updateAirport(req.params.id, {
      name: req.body.name,
      code: req.body.code,
      address: req.body.address,
      cityID: req.body.cityID,
    });
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
module.exports = {
  createAirport,
  getAirports,
  getAirport,
  destroyAirport,
  updateAirport,
};

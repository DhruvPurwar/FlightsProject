const { AirplaneService } = require("../services");

const { StatusCodes, INTERNAL_SERVER_ERROR } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
// const { getAirplanes } = require("../services/airplane-service");
/**
 * POST request
 * req-body{modelNumber:'airbus380', capacity:200}
 */

async function createAirplane(req, res) {
  try {
    // Controller redirect req to services.
    const airplane = await AirplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    // structuring response in controllers.
    SuccessResponse.data = airplane;
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

async function getAirplanes(req, res) {
  try {
    const airplanes = await AirplaneService.getAirplanes();
    SuccessResponse.data = airplanes;
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

async function getAirplane(req, res) {
  try {
    const airplane = await AirplaneService.getAirplane(req.params.id);
    SuccessResponse.data = airplane;
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
async function destroyAirplane(req, res) {
  try {
    const response = await AirplaneService.destroyAirplane(req.params.id);
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function updateAirplane(req, res) {
  try {
    const response = await AirplaneService.updateAirplane(req.params.id, {
      capacity: req.body.capacity,
    });
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
module.exports = {
  createAirplane,
  getAirplanes,
  getAirplane,
  destroyAirplane,
  updateAirplane,
};

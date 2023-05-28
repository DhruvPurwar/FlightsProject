const { CityService } = require("../services");

const { StatusCodes, INTERNAL_SERVER_ERROR } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

/**
 *
 * POST: /city
 * req-body {name= 'delhi'}
 */

async function createCity(req, res) {
  try {
    // Controller redirect req to services.
    const city = await CityService.createCity({
      name: req.body.name,
    });
    // structuring response in controllers.
    SuccessResponse.data = city;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    // structuring response in controllers.
    ErrorResponse.error = error;
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    // Earlier error code was hardcoded, now we can see what error , airplane service has sent.
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function destroyCity(req, res) {
  try {
    const response = await CityService.destroyCity(req.params.id);
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function updateCity(req, res) {
  try {
    const response = await CityService.updateCity(req.params.id, {
      name: req.body.name,
    });
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createCity,
  destroyCity,
  updateCity,
};

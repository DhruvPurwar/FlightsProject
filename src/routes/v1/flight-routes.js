const express = require("express");

const router = express.Router();
const { FlightMiddlewares } = require("../../middlewares");
const { FlightController } = require("../../controllers");

//  POST  /api/v1/flights
router.post(
  "/",
  FlightMiddlewares.validateCreateRequest,
  FlightController.createFlight
);

// GET api/v1/flights?trips='MUM-DEL'
router.get(
  "/",

  FlightController.getAllFlights
);

module.exports = router;

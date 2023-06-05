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
// GET api/v1/flights/id
router.get(
  "/:id",

  FlightController.getFlight
);
// PATCH api/v1/flights/seats
router.patch(
  "/:id/seats",
  FlightMiddlewares.validateUpdateSeatsRequest,
  FlightController.updateSeats
);

module.exports = router;

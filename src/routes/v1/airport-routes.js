const express = require("express");

const router = express.Router();
const { AirportMiddlewares } = require("../../middlewares");
const { AirportController } = require("../../controllers");

//  POST  /api/v1/airports
router.post(
  "/",
  AirportMiddlewares.validateCreateRequest,
  AirportController.createAirport
);

//  GET  /api/v1/airports

router.get("/", AirportController.getAirports);

//  GET /api/v1/airports/:id

router.get(
  "/:id",

  AirportController.getAirport
);

//  DELETE /api/v1/airports/:id

router.delete("/:id", AirportController.destroyAirport);

//  PATCH /api/v1/airports/:id
router.patch("/:id", AirportController.updateAirport);

module.exports = router;

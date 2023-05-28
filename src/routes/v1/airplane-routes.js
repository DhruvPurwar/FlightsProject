const express = require("express");

const router = express.Router();
const { AirplaneMiddlewares } = require("../../middlewares");
const { AirplaneController } = require("../../controllers");

//  POST  /api/v1/airplanes
router.post(
  "/",
  AirplaneMiddlewares.validateCreateRequest,
  AirplaneController.createAirplane
);

router.get("/", AirplaneController.getAirplanes);

router.get(
  "/:id",

  AirplaneController.getAirplane
);

router.delete("/:id", AirplaneController.destroyAirplane);
router.patch("/:id", AirplaneController.updateAirplane);

module.exports = router;

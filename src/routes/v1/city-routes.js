const express = require("express");

const router = express.Router();
// const { CityMiddlewares } = require("../../middlewares");
const { CityController } = require("../../controllers");
const { CityMiddlewares } = require("../../middlewares");
//  POST  /api/v1/cities
router.post(
  "/",
  CityMiddlewares.validateCreateRequest,
  CityController.createCity
);

router.delete("/:id", CityController.destroyCity);
router.patch("/:id", CityController.updateCity);

module.exports = router;

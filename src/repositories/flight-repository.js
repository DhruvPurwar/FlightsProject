const CrudRepository = require("./crud-repository");
const { Flights } = require("../models");

class FlightRepository extends CrudRepository {
  constructor() {
    super(Flights);
  }

  async getAllFlights(filter, sort) {
    const response = await Flights.findAll({
      where: filter,
      order: sort,
    });

    return response;
  }
}

module.exports = FlightRepository;

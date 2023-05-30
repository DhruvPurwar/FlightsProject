const CrudRepository = require("./crud-repository");
const { Sequelize, Op } = require("sequelize");
const { Flights, Airplane, Airport, City } = require("../models");

class FlightRepository extends CrudRepository {
  constructor() {
    super(Flights);
  }

  async getAllFlights(filter, sort) {
    const response = await Flights.findAll({
      where: filter,
      order: sort,
      //   Helps in eager Loading
      //   We only mention foreign keys in migration, so JS layer (model) doesnt know that and by default picks up primary keys.
      // That is y, we need to use "on" field here to justify
      include: [
        {
          model: Airplane,
          required: true,
          as: "airplaneDetails", // also add alias while making associations
        },
        {
          model: Airport,
          required: true,
          as: "departureAirport",
          on: {
            // DO mapping on different columns (rather than Airport.Id to Airport.code)
            col1: Sequelize.where(
              Sequelize.col("Flights.departureAirportId"),
              "=",
              Sequelize.col("departureAirport.code")
            ),
          },
          //   Multi-level Joins
          include: {
            model: City,
            required: true,
            as: "cityDetails",
          },
        },
        {
          model: Airport,
          required: true,
          as: "arrivalAirport",
          on: {
            // DO mapping on different columns (rather than Airport.Id to Airport.code)
            col1: Sequelize.where(
              Sequelize.col("Flights.arrivalAirportId"),
              "=",
              Sequelize.col("arrivalAirport.code")
            ),
          },
        },
      ],
    });

    return response;
  }
}

module.exports = FlightRepository;

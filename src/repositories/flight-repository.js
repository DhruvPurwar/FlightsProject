const CrudRepository = require("./crud-repository");
const { Sequelize, Op } = require("sequelize");
const { Flights, Airplane, Airport, City } = require("../models");
const { addRowLockOnFlights } = require("./queries");

const db = require("../models");

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

  async updateRemainingSeats(flightId, seats, dec = true) {
    await db.sequelize.query(addRowLockOnFlights(flightId));
    //  The "FOR UPDATE" in above query puts row lock since we dont want different users to access the decrement/increment function concurrently
    const flight = await Flights.findByPk(flightId);
    if (+dec) {
      await flight.decrement("totalSeats", { by: seats });
      // return res;  increment/decrement return old data.
    } else {
      await flight.increment("totalSeats", { by: seats });
    }
    // await flight.save();
    return flight;
  }
}

module.exports = FlightRepository;

const { StatusCodes } = require("http-status-codes");
const { Logger } = require("../config");
const AppError = require("../utils/errors/app-error");
// All queries are given in sequelize docs
class CrudRepository {
  constructor(model) {
    this.model = model;
  }
  // We have commented try-catch since we will handle errors in service layer .
  async create(data) {
    // try {
    //   const response = await this.model.create(data);
    //   return response;
    // } catch (error) {
    //   Logger.error("Something went wrong in Crud Repo: Create");
    //   throw error;
    // }
    console.log("CRUD REPO DATA");
    console.log(data);
    const response = await this.model.create(data);
    return response;
  }

  async destroy(data) {
    // try {
    //   const response = await this.model.destroy({
    //     where: {
    //       id: data,
    //     },
    //   });
    //   return response;
    // } catch (error) {
    //   Logger.error("Something went wrong in Crud Repo: Destroy ");
    //   throw error;
    // }

    const response = await this.model.destroy({
      where: {
        id: data,
      },
    });
    if (!response) {
      throw new AppError("Not able to find resource", StatusCodes.NOT_FOUND);
    }
    return response;
  }
  // find unique data
  async get(data) {
    // try {
    //   const response = await this.model.findByPk(data);
    //   return response;
    // } catch (error) {
    //   Logger.error("Something went wrong in Crud Repo: Destroy ");
    //   throw error;
    // }

    const response = await this.model.findByPk(data);
    if (!response) {
      throw new AppError("Not able to find resource", StatusCodes.NOT_FOUND);
    }
    return response;
  }

  async getAll() {
    // try {
    //   const response = await this.model.findAll(data);
    //   return response;
    // } catch (error) {
    //   Logger.error("Something went wrong in Crud Repo: Destroy ");
    //   throw error;
    // }
    const response = await this.model.findAll();
    return response;
  }

  async update(id, data) {
    // data should be object {key:value,...}
    // try {
    //   const res = await this.model.update(data, {
    //     where: {
    //       id: id,
    //     },
    //   });
    //   return res;
    // } catch (error) {
    //   Logger.error("Something went wrong in Crud Repo: Destroy ");
    //   throw error;
    // }

    const res = await this.model.update(data, {
      where: {
        id: id,
      },
    });
    return res;
  }
}

module.exports = CrudRepository;

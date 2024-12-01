const { RESTDataSource } = require("@apollo/datasource-rest");

class VehiclesAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:5001/";
  }

  async getVehicles() {
    const response = await this.get("api/vehicles");
    return response.data;
  }

  async getVehicle(id) {
    const response = await this.get(`api/vehicles/${id}`);
    return response.data;
  }

  async createVehicle(userId, vehicle) {
    console.log(userId, vehicle);
    const response = await this.post("api/vehicles?user=" + userId, {
      body: vehicle,
    });
    return response.data;
  }

  async updateVehicle(id, vehicle) {
    const response = await this.put(`api/vehicles/${id}`, { body: vehicle });
    return response.data;
  }

  async deleteVehicle(id) {
    await this.delete(`api/vehicles/${id}`);
    return true;
  }
}
module.exports = VehiclesAPI;

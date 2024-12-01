const { RESTDataSource } = require("@apollo/datasource-rest");

class UsersAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:5001/";
  }

  async getUsers() {
    const response = await this.get("api/users");
    return response.data;
  }

  async createUser(user) {
    const response = await this.post("api/users", { body: user });
    return response.data;
  }
}

module.exports = UsersAPI;

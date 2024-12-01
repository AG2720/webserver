const resolvers = {
  Query: {
    users: (_, __, { dataSources }) => dataSources.usersAPI.getUsers(),
    vehicles: (_, __, { dataSources }) => dataSources.vehiclesAPI.getVehicles(),
    vehicle: (_, { id }, { dataSources }) =>
      dataSources.vehiclesAPI.getVehicle(id),
  },
  Mutation: {
    createUser: (_, { input }, { dataSources }) =>
      dataSources.usersAPI.createUser(input),
    createVehicle: (_, { userId, input }, { dataSources }) =>
      dataSources.vehiclesAPI.createVehicle(userId, input),
    updateVehicle: (_, { id, input }, { dataSources }) =>
      dataSources.vehiclesAPI.updateVehicle(id, input),
    deleteVehicle: (_, { id }, { dataSources }) =>
      dataSources.vehiclesAPI.deleteVehicle(id),
  },
  User: {
    vehicles: (user, _, { dataSources }) =>
      dataSources.vehiclesAPI
        .getVehicles()
        .then((vehicles) =>
          vehicles.filter((vehicle) => vehicle.userId === user.id)
        ),
  },
};

module.exports = resolvers;

const { ApolloServer } = require("apollo-server");
const UsersAPI = require("./dataSources/UsersAPI");
const VehiclesAPI = require("./dataSources/VehiclesAPI");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    usersAPI: new UsersAPI(),
    vehiclesAPI: new VehiclesAPI(),
  }),
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

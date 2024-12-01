const { gql } = require("apollo-server");

const typeDefs = gql`
  type Vehicle {
    id: ID!
    make: String!
    model: String!
    type: String!
    license_plate: String!
    commissioned: Boolean!
  }

  type User {
    id: ID!
    name: String!
    username: String!
    vehicles: [Vehicle]!
  }

  type Query {
    users: [User]!
    user(id: ID!): User
    vehicles: [Vehicle]!
    vehicle(id: ID!): Vehicle
  }

  input VehicleInput {
    make: String!
    model: String!
    type: String!
    license_plate: String!
    commissioned: Boolean!
  }

  input UserInput {
    name: String!
    username: String!
  }

  type Mutation {
    createUser(input: UserInput!): User
    createVehicle(userId: ID!, input: VehicleInput!): Vehicle
    updateVehicle(id: ID!, input: VehicleInput!): Vehicle
    deleteVehicle(id: ID!): Boolean
  }
`;

module.exports = typeDefs;

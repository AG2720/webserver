const { gql } = require('graphql-tag')

const typeDefs = gql`
    type Album {
        id: ID!
        artist: String!
        title: String!
        year: Int!
        genre: String!
        tracks: Int!
        updatedAt: String
        owner: ID
    }
    
    type Query {
        albums: [Album]
        album(id: ID!): Album
    }
        
    type Mutation {
        createAlbum(
            artist: String!, 
            title: String!, 
            year: Int!, 
            genre: String!,
            tracks: Int!,
            owner: ID
        ): Album
        updateAlbum(
            id: ID!, 
            artist: String, 
            title: String, 
            year: Int, 
            genre: String
            tracks: Int
        ): Album
        deleteAlbum(id: ID!): Boolean
    }
`

module.exports = typeDefs
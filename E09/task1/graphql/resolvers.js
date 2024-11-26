const Album = require('../models/Album')

const resolvers = {
    Query: {
        albums: async () => {
            return await Album.find({})
        },
        album: async (_, { id }) => {
            return await Album.findById(id)
        }
    },
    Mutation: {
        createAlbum: async (_, { artist, title, year, genre, tracks }) => {
           const newAlbum = new Album({
                artist,
                title,
                year,
                genre,
                tracks,
           })

           await newAlbum.save()
           return newAlbum
        },
        updateAlbum: async (_, { id, artist, title, year, genre, tracks }) => {
            const updatedAlbum = await Album.findByIdAndUpdate(
                    id,
                    { artist, title, year, genre, tracks },
                    { new: true, runValidators: true }
                )
                return updatedAlbum
        }, 
        deleteAlbum: async (_, { id }) => {
                const result = await Album.findByIdAndDelete(id)
                return !!result
        }
    }
}

module.exports = resolvers
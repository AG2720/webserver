const albums = [
    { id: "1", artist: "Taylor Swift", title: "Album", year: 2010, genre: "Pop" },
    { id: "1", artist: "Bon Jovi", title: "Album1", year: 1984, genre: "Rock" }
]

const resolvers = {
    Query: {
        albums: () => albums,
        album: (_, { id }) => albums.find((album) => album.id === id),
    },
    Mutation: {
        createAlbum: (_, { artist, title, year, genre }) => {
            const newAlbum = { id: String(albums.length + 1), artist, title, year, genre }
            albums.push(newAlbum)
            return newAlbum
        },
        updateAlbum: (_, { id, artist, title, year, genre }) => {
            const album = albums.find(album => album.id === id)
            if (!album) return null
            if (artist) album.artist = artist
            if (title) album.title = title
            if (year) album.year = year
            if (genre) album.genre = genre

            return album
        }, 
        deleteAlbum: (_, { id }) => {
            const index = albums.findIndex(album => album.id === id)
            if (index === -1) return false

            albums.splice(index, 1)
            return true
        }
    }
}

module.exports = resolvers
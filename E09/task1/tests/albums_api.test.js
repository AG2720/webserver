const mongoose = require('mongoose')
const supertest = require('supertest')
const Album = require('../models/Album')
const testAlbums = require('./albums.json')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/User')

let agent;

beforeEach(async () => {
  await User.deleteMany({})
  await Album.deleteMany({})

  //const passwordHash = await bcrypt.hash('password123', 10)
  const testUser = new User({
    name: "admintest",
    email: 'admin@test.com',
    password: "password123"
  })
  const savedUser = await testUser.save()

  agent = supertest.agent(app)

  await agent 
    .post('/api/login')
    .send({ email: 'admin@test.com', password: 'password123' })
    .expect(200)

    const testAlbumsWithOwner = testAlbums.map(album => ({
        ...album,
        owner: savedUser._id,
    }))
    await Album.insertMany(testAlbumsWithOwner)
})

test('albums returned as json', async () => {
  const response = await agent
    .get('/api/albums')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(testAlbums.length)
})

test('albums can be added successfully', async () => {
    const newAlbum = {
        artist: 'Taylor Swift',
        title: 'Midnights',
        year: 2022,
        genre: 'Pop',
        tracks: 13,
    }

    const postResponse = await agent
        .post('/api/albums')
        .send(newAlbum)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    expect(postResponse.body).toMatchObject(newAlbum)

    const albumsInDb = await Album.find({})
    expect(albumsInDb).toHaveLength(testAlbums.length +1)
    expect(albumsInDb.some(album => album.title === newAlbum.title)).toBe(true)
})

test('successfully deletes an album', async () => {
    const albumsInDbBefore = await Album.find({})
    const albumToDelete = albumsInDbBefore[0]

    await agent 
        .delete(`/api/albums/${albumToDelete._id}`)
        .expect(200)

    const albumsInDbAfter = await Album.find({})
    expect(albumsInDbAfter).toHaveLength(albumsInDbBefore.length -1)

    const deletedAlbum = await Album.findById(albumToDelete._id)
    expect(deletedAlbum).toBeNull()
})

test('attempt to delete a non-existent album', async () => {
    const nonExistentId = new mongoose.Types.ObjectId()

    const response = await agent
        .delete(`/api/albums/${nonExistentId}`)
        .expect(404)

    console.log(response.body)

    const albumsInDb = await Album.find({})
    expect(albumsInDb).toHaveLength(testAlbums.length)
})


afterAll(async () => {
    await mongoose.connection.close()
})

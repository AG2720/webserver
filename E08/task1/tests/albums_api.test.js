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

afterAll(async () => {
    await mongoose.connection.close()
})

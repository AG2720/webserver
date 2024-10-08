const express = require('express')
const app = express()

const PORT = 5001

app.get('/', (req, res) => {
  console.log('Resource requested')
  res.status(200).send('Home Page')
})

app.all('*', (req, res) => {
  res.status(404).send('<h1>Not found!</h1>')
})

app.listen(PORT, () => {
  console.log(`server is listening on port http://localhost:${PORT}...`)
})


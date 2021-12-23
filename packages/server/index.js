const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 5000
const BASE_DIR = process.env.BASE_DIR || '../epc-client'
const INDEX_PATH = path.join(__dirname, BASE_DIR, 'build', 'index.html')
app.use(express.static(path.join(BASE_DIR, 'build')))
app.get('/*', function (_, res) {
  res.sendFile(INDEX_PATH)
})
app.listen(PORT, () =>
  console.log(`Listening on ${PORT} redirecting to ${INDEX_PATH}`)
)

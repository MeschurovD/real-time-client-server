const express = require('express')
const cors = require('cors')

const PORT = 5000

const app = express()

app.listen(PORT, () => console.log(`server started on port ${PORT}`))
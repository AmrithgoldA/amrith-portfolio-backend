const express = require('express');

const app = express()
const port = 3000

app.listen(port, () => {
    console.log("port is running on port 3000");
})
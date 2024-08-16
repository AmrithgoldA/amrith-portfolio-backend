require('dotenv').config();
const express = require('express');
const routes = require('./src/route');

const app = express();
const port = process.env.PORT || 3001;

app.use(routes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

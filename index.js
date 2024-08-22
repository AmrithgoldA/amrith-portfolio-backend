require('dotenv').config();
const express = require('express');
const routes = require('./src/route');
const cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json());  
const port = process.env.PORT || 3001;

app.use(routes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

require('dotenv').config();
const express = require('express');
const routes = require('./src/route');
const cors = require('cors')

const app = express();

const corsOptions = {
    origin: ['https://amrith-gold.netlify.app', 'http://localhost:5173'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.use(express.json());  
const port = process.env.PORT || 3001;

app.use(routes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

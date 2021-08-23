const express = require('express');

const userRoutes = require('./routes/user');

const app = express();

app.use(express.urlencoded({extended: false}));

app.use(express.json());

app.use(userRoutes);

app.listen(3000); 
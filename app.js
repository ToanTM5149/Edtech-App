const express = require('express');
const usersRoutes = require('./server/routes/users');
const authRoutes = require('./server/routes/auth');
const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

app.get('/', (req, res) => res.send('Hello, Edtech App!'));

module.exports = app;

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const initializeDB = require('./database');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());

const corsOptions = {
  origin: 'https://event-management-eight-ashen.vercel.app', // Replace with your frontend's URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow credentials if needed
  optionsSuccessStatus: 204 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

const initializeDBAndServer = async () => {
  try {
    const db = await initializeDB();

    app.use((req, res, next) => {
      req.db = db;
      next();
    });

    app.use('/api', routes);

    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Something went wrong!');
    });

    app.listen(4000, () => {
      console.log('Server running at http://localhost:4000/');
    });
  } catch (e) {
    console.error(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();
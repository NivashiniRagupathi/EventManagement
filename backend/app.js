const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const initializeDB = require('./database');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());

app.use(cors({
  origin: 'https://event-management-eight-ashen.vercel.app/login'
}));

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
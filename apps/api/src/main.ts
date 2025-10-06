/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import { expressOpenApi } from './service/express-openapi';
import cors from 'cors';
import { sequelize } from './service/sequelize';

const app = express();

app.use(cors());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to ConnexAI Tech Test API' });
});

expressOpenApi(app);

const port = process.env.PORT || 3333;
const server = app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);

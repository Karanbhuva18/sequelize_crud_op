import express from 'express';
import dotenv from 'dotenv'
const app = express();

import router from './src/routes/index.js';
dotenv.config({ path: './env' });
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/sequelize',router)

export default app;
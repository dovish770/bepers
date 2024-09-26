import express, { Application } from 'express';
import beeperRoutes from './routes/beepers.js'

const PORT:number = 8080;
const app: Application = express();
app.use(express.json());

app.use('/api', beeperRoutes);

app.listen(PORT,()=>{console.log("server is on")});
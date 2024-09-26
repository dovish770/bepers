import express from 'express';
import beeperRoutes from './routes/beepers.js';
const PORT = 8080;
const app = express();
app.use(express.json());
app.use('/api', beeperRoutes);
app.listen(PORT, () => { console.log("server is on"); });

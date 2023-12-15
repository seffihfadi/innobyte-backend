// for task and submition
import express from "express";
import Private from '../middlewares/auth.js';


const taskRoutes = express.Router()

taskRoutes.post('/create-departement', Private, () => {});

export default taskRoutes
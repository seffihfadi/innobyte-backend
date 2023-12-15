// for project and apply
import express from "express";
import Private from '../middlewares/auth.js';


const messageRoutes = express.Router()

messageRoutes.post('/create-departement', Private, () => {});

export default messageRoutes
import express from "express";
import { createDepartement } from "../controllers/admin.js";
import Private from '../middlewares/auth.js';


const adminRoutes = express.Router()

adminRoutes.post('/create-departement', Private, createDepartement);

export default adminRoutes
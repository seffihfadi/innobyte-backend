// for project and apply
import express from "express";
import { 
  createProject, 
  deleteProject, 
  toggleApply, 
  applyDecision, 
  getProject, 
  getProjects
} from "../controllers/project.js";
import Private from '../middlewares/auth.js';


const projectRoutes = express.Router()

projectRoutes.post('/create-project', Private, createProject);
projectRoutes.put('/toggle-apply', Private, toggleApply);
projectRoutes.get('/get-project/:projectID', Private, getProject);
projectRoutes.get('/get-projects', Private, getProjects);
projectRoutes.post('/apply-decision/:applyID', Private, applyDecision);
projectRoutes.delete('/delete-project/:projectID', Private, deleteProject);


export default projectRoutes
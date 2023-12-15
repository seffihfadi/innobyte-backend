// for task and submition
import express from "express";
import multer from "multer";
import { 
  createTask, 
  deleteTask, 
  addSubmittion, 
  evaluateSubmittion, 
  getSubmittion
} from "../controllers/task.js";
import Private from '../middlewares/auth.js';


// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, URLs.challangeUpload);
  },
  filename: (req, file, cb) => {
    cb(null, `_${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const taskRoutes = express.Router()

taskRoutes.post('/create-task', Private, createTask);
taskRoutes.delete('/delete-task/:taskID', Private, deleteTask);
taskRoutes.post('/add-submission/:taskID', Private, upload.single('assignment'), addSubmittion);
taskRoutes.post('/evaluate-submission/:submittionID', Private, evaluateSubmittion);
taskRoutes.get('/get-submission/:submittionID', Private, getSubmittion);

export default taskRoutes
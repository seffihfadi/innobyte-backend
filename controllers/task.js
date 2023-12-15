// for task and submition
import Task from '../models/Task.js'
import Submittion from '../models/Submission.js'

export const createTask = async (req, res, next) => {
  const {_id: sessionID} = req.user
  const {name, description, endsin, projectID} = req.body
  try {
    const taskExists = await Task.findOne({name}).populate('project')
    if (!!taskExists) {
      res.status(400)
      throw new Error('task already exists !')
    }

    if (taskExists.project.owner.toString() !== sessionID.toString()) {
      res.status(400)
      throw new Error('you have not permissions')
    }


    const task = await Task.create({name, project: projectID, description, endsIn: endsin})
    if (!task) {
      res.status(500)
      throw new Error('task does not created')
    }

    return res.status(200).json({message: 'task created successfuly'})

  } catch (error) {
    next(error)
  }
}


export const deleteTask = async (req, res, next) => {
  const {taskID} = req.params
  try {
    const task = await Task.findById(taskID)
    if (!task) {
      res.status(400)
      throw new Error('task not exists !')
    }

    await task.deleteOne()
    await task.save()
    
    return res.status(200).json({message: 'task deleted.'})

  } catch (error) {
    next(error)
  }
}


export const addSubmittion = async (req, res, next) => {
  const { taskID } = req.params;
  const { submittion } = req.body;
  const { _id: sessionID } = req.user;
  try {
    if (!submittion) {
      res.status(400)
      throw new Error('you are required to submit something')
    }

    const task = await Task.findById(taskID)
    if (!task) {
      res.status(400)
      throw new Error('task does not exists')
    }

    const filePath = `${URLs.challangeUpload}/${challengeName.replace(/ /g, "_") + '_challenge.pdf'}`;

    await fs.rename(assignment.path, filePath);

    deleteFiles(`${URLs.challangeUpload}/`, '_')

    const currentTime = new Date();
    const taskEndTime = new Date(task.endsIn);

    if (currentTime > taskEndTime) {
      res.status(400);
      throw new Error('task submission deadline has passed');
    }



    const submt = await Submittion.create({
      submittion,
      employer: sessionID,
      task: taskID,
      assignment: filePath
    })

    if (!submt) {
      res.status(500)
      throw new Error('your submission was not successful. try again later.')
    }

    return res.status(201).json({message: 'your submission has been successfully uploaded'})

  } catch (error) {
    next(error);
  }
};


export const evaluateSubmittion = async (req, res, next) => {
  const {_id: sessionID} = req.user;
  const {submittionID} = req.params;
  const {decision, feedback} = req.body;
  try {
    if (!['accepted', 'rejected'].includes(decision)) {
      res.status(400)
      throw new Error('this is not a valid decision')
    }

    const sub = await Submittion.findById(submittionID).populate('task').populate('project')
    if (!sub) {
      res.status(400)
      throw new Error('this submittion does not exist')
    }

    // just the owner of the challange can update it
    if(sub.task.project.owner.toString() !== sessionID.toString()) {
      res.status(403)
      throw new Error('you can not make decisions on this challenge')
    }
    await sub.updateOne({status: decision, feedback})
    await sub.save()

    return res.status(200).json({message: `this submission have been ${decision}`})

  } catch (error) {
    next(error);
  }
};


export const getSubmittion = async (req, res, next) => {
  const {_id: sessionID} = req.user;
  const {submittionID} = req.params;

  try {
    const sub = await Submittion.findById(submittionID).populate(['task', 'employer']).populate('project')
    if (!sub) {
      res.status(400)
      throw new Error('this submittion does not exist')
    }
    const haventAccess 
      =  sub.employer.toString() !== sessionID.toString() 
      || sub.task.project.owner.toString() !== sessionID.toString()

    if (haventAccess) {
      res.status(403)
      throw new Error('you have not access to this submission')
    }

    return res.status(200).json(sub)
    
    
  } catch (error) {
    next(error);
  }
};
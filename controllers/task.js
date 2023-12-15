// for task and submition
import Task from '../models/Task.js'

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
  const { challengeID } = req.params;
  const { submittion } = req.body;
  const { _id: participantSessionID } = req.user;
  try {
    if (!submittion) {
      res.status(400)
      throw new Error('you are required to submit something')
    }

    const challenge = await Challenge.findById(challengeID).populate('field')
    if (!challenge) {
      res.status(400)
      throw new Error('challenge does not exists')
    }

    const currentTime = new Date();
    const challengeEndTime = new Date(challenge.field.endsIn);

    if (currentTime > challengeEndTime) {
      res.status(400);
      throw new Error('challenge submission deadline has passed');
    }

    const maxSubmittions = challenge.maxSubmittions;
    const previousSubmittions = await Submittion.find({
      participent: participantSessionID, 
      challenge: challengeID
    })

    if (previousSubmittions.length >= maxSubmittions) {
      res.status(405)
      throw new Error(`you have already submitted ${previousSubmittions.length} times, further submissions are not allowed`)
    }
    
    const submt = await Submittion.create({
      submittion, 
      participent: participantSessionID, 
      challenge: challengeID
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
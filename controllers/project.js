// for project and apply
import Project from '../models/Project.js'
import Apply from '../models/Apply.js'

export const createProject = async (req, res, next) => {
  const {_id: sessionID} = req.user
  const {name, description, fields} = req.body
  try {
    const projectExists = await Project.findOne({owner: sessionID, name: name})
    if (!!projectExists) {
      res.status(400)
      throw new Error('this project already exists !')
    }

    const project = await Project.create({name, description, fields, owner: sessionID})
    if (!project) {
      res.status(500)
      throw new Error('project does not created')
    }

    return res.status(200).json({message: 'project created successfuly'})

  } catch (error) {
    next(error)
  }
}

export const deleteProject = async (req, res, next) => {
  const {_id: sessionID} = req.user
  const {projectID} = req.params
  try {
    const project = await Project.findOne({ _id: projectID, owner: sessionID });

    if (!project) {
      res.status(400)
      throw new Error('this project does not exist')
    }

    await project.deleteOne()
    await project.save()

    return res.status(200).json({message: 'project deleted successfuly'})

  } catch (error) {
    next(error)
  }
}

export const getProject = async (req, res, next) => {
  const {projectID} = req.params
  try {
    const project = await Project.findById(projectID);

    if (!project) {
      res.status(400)
      throw new Error('this project does not exist')
    }

    return res.status(200).json(project)

  } catch (error) {
    next(error)
  }
}


export const getProjects = async (req, res, next) => {
  const {_id: sessionID} = req.user
  
  try {
    const projects = await Project.find({employies: { $in: [sessionID] }});
    return res.status(200).json(projects)

  } catch (error) {
    next(error)
  }
}


export const toggleApply = async (req, res, next) => {
  const {_id: sessionID} = req.user
  const {projectID, motivation} = req.body

  try {
    const applyExists = await Apply.find({employer: sessionID, project: projectID})
    if (!!applyExists) {
      await applyExists.deleteOne()
      await applyExists.save()

      return res.status(200).json({message: 'apply deleted successfully'})
    }

    const project = await Apply.create({employer: sessionID, project: projectID, motivation})
    if (!project) {
      res.status(500)
      throw new Error('apply does not created')
    }

    return res.status(200).json({message: 'applied successfuly'})

  } catch (error) {
    next(error)
  }
}


export const applyDecision = async (req, res, next) => {
  const {_id: sessionID} = req.user;
  const {applyID} = req.params;
  const {decision} = req.body;
  try {
    if (!['accepted', 'rejected'].includes(decision)) {
      res.status(400)
      throw new Error('this is not a valid decision')
    }
    
    const apply = await Apply.findById(applyID).populate('project')
    if (apply.project._id.toString() !== sessionID.toString()) {
      res.status(403)
      throw new Error('you have not access to change this')
    }
    await apply.updateOne({status: decision})
    await apply.save()

    return res.status(200).json({message: `this apply have been ${decision}`})

  } catch (error) {
    next(error);
  }
};



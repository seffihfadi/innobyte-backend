import {model, Schema, Types} from 'mongoose'

const projectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    min: 5,
    max: 250,
    required: true
  },
  owner: {
    type: Types.ObjectId,
    ref: 'User'
  },
  employies: [{
    type: Types.ObjectId,
    ref: 'User'
  }],
  // submissions: [{
  //   type: Types.ObjectId,
  //   ref: 'Submission'
  // }],
  fields: [{
    type: String,
  }]
}, {
  timestamps: true
})


const Project = model('Project', projectSchema)
export default Project
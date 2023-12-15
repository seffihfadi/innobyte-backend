import {model, Schema, Types} from 'mongoose'

const submittionSchema = new Schema({
  employer: {
    type: Types.ObjectId,
    ref: 'User'
  },
  task: {
    type: Types.ObjectId,
    ref: 'Task'
  },
  submittion: {
    type: String,
    min: 5,
    max: 250,
    required: true
  }, 
  assignment: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  feedback: {
    type: String,
    max: 250,
  }
}, {
  timestamps: true
})


const Submittion = model('Submittion', submittionSchema)
export default Submittion
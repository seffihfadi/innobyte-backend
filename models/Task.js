import {model, Schema, Types} from 'mongoose'

const taskSchema = new Schema({
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
  submissions: [{
    type: Types.ObjectId,
    ref: 'Submission'
  }],
  endsIn: {
    type: Date,
  }
}, {
  timestamps: true
})


const Task = model('Task', taskSchema)
export default Task
import {model, Schema, Types} from 'mongoose'

const applySchema = new Schema({
  employer: {
    type: Types.ObjectId,
    ref: 'User'
  },
  project: {
    type: Types.ObjectId,
    ref: 'Project'
  },
  motivation: {
    type: String,
    min: 5,
    max: 250,
    required: true
  }, 
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
})


const Apply = model('Apply', applySchema)
export default Apply
import {model, Schema, Types} from 'mongoose'

const departementSchema = new Schema({
  name: {
    type: String,
    required: [true, 'departement name is required'],
  },
  manager: {
    type: Types.ObjectId, 
    ref: 'User'
  }, 
  coManager: {
    type: Types.ObjectId, 
    ref: 'User'
  },
  teams: [{
    type: Types.ObjectId,
    ref: 'Team'
  }]
}, {
  timestamps: true
})


const Department = model('Department', departementSchema)
export default Department
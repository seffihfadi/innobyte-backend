import {model, Schema, Types} from 'mongoose'

const teamSchema = new Schema({
  name: {
    type: String,
    required: [true, 'team name is required'],
  },
  leader: {
    type: Types.ObjectId, 
    ref: 'User'
  }, 
  coLeader: {
    type: Types.ObjectId,
    ref: 'User'
  },
  members: [{
    type: Types.ObjectId,
    ref: 'User'
  }]


}, {
  timestamps: true
})


const Team = model('Team', teamSchema)
export default Team
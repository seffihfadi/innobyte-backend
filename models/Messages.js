import { Schema, model, Types } from "mongoose";

const messageSchema = new Schema({
  project: {
    type: Types.ObjectId,
    ref: 'Project'
  },
  sender: {
    type: Types.ObjectId,
    ref: 'User'
  },
  content: {
    type: String,
    trim: true,
    required: true
  }
}, {
  timestamps: true
})

const Message = model('Message', messageSchema)
export default Message
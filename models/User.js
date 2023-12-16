import {model, Schema} from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
  fullname: {
    type: String,
    required: [true, 'fullname is required'],
    match: [/^(?=.{4,18}$)[a-zA-Z]+ [a-zA-Z]+$/, "{VALUE} is not a valid fullname"]
  },
  email: {
    type: String,
    required: [true, 'eamil is required'],
    unique: true,
    match: [/^[a-zA-Z0-9._%+-]+@gmail\.com$/, "{VALUE} is not a valid gmail"]
  },
  password: {
    type: String,
    required: [true, 'password is required']

  },

  rank: {
    type: Number,
    default: 0
  },

  bio: {
    type: String,
    min: 5,
    max: 255,
    default: ''
  }, 
  job: {
    type: String,
    default: ''
  },

}, {
  timestamps: true
})


userSchema.pre('save', async function(next) {
  if (!this.isModified('password')){
    return next()
  }else {
    // encrypt password 
    const salt = bcrypt.genSaltSync(10)
    const hashPass = bcrypt.hashSync(this.password, salt)
    this.password = hashPass
    next()

  }
})


const User = model('User', userSchema)
export default User
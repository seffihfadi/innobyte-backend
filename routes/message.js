import express from 'express'
import Private from '../middlewares/auth.js'
import { getRoomMessages, insertMessage, deleteMessage } from '../controllers/message.js'

const messagesRoutes = express.Router()

messagesRoutes.route('/insert-message').post(Private, insertMessage)
messagesRoutes.route('/:roomID').get(Private, getRoomMessages)
messagesRoutes.route('/:messageID/delete').delete(Private, deleteMessage)

export default messagesRoutes
import { Schema, model } from "mongoose"
import { UserDocument } from "../types/auth"

const User = model<UserDocument>('User', new Schema({
    firstName: {
        type: String
    },  
    lastName: {
        type: String
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { versionKey: false }))

export default User
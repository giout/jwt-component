import { Schema, model } from "mongoose"
import { AuthDocument } from "../types/auth"

const AuthUser = model<AuthDocument>('AuthUser', new Schema({
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

export default AuthUser
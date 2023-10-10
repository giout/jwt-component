import { Document } from "mongoose"
import { JwtPayload } from "jsonwebtoken"
import { Request } from "express"

export interface UserDocument extends Document { 
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string
}

export interface AuthRequest extends Request {
    user: string | JwtPayload
}
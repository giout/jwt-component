import 'dotenv/config'
import { NextFunction, Request, Response } from "express"
import { Model } from "mongoose"
import { AuthDocument } from "../types/auth"
import { compareCrypted, encrypt } from "../utils/bcrypt"
import jwt from "jsonwebtoken"
import CustomError from '../../error/CustomError'

const signature = <string> process.env.TOKEN_SIGNATURE

export class AuthController {
    userModel: Model<AuthDocument>

    constructor(model: Model<AuthDocument>) {
        this.userModel = model
    }

    public signUp = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let { username, email, password } = req.body
            const user = await this.userModel.findOne({ email })
            
            if (user) {
                throw new CustomError('User already exists', 400)
            } else {
                if (username && email && password) {
                    // crypting password
                    req.body.password = encrypt(password, 10)
                    const entry = await this.userModel.create(req.body)
                    return res.status(200).json({ msg: 'User created', user: entry })
                }
            }

            throw new CustomError('All fields must be filled', 400)
            
        } catch (error) {
            next(error)
        }
    }

    public logIn = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // verifying if user exists 
            const { email, password } = req.body
            const user = await this.userModel.findOne({ email })
    
            if (user) {
                const { username } = user

                // verifying if password matches
                if (compareCrypted(password, user.password)) {
                    const payload = { username }

                    // creating and sending auth token
                    const token = jwt.sign(payload, signature, { 
                        expiresIn: 60*60*24*7 
                    })
                    res.status(200).json({ token })
                }
            }
    
            throw new CustomError('User or password are invalid', 400)

        } catch (error) {
            next(error)
        }
    }
}
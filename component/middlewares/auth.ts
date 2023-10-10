import { Response, NextFunction } from "express"
import { AuthRequest } from "../types/auth"
import jwt from 'jsonwebtoken'
import CustomError from "../../error/CustomError"
import { Request } from "express"

export const authentication = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers['authorization'] || ''

    try {
        // Bearer token authentication schema
        if (auth.split(' ').length === 2) {
            const token = auth.split(' ')[1]
            const signature = <string> process.env.TOKEN_SIGNATURE 
            let decoded = jwt.verify(token, signature)

            if (!decoded) {
                throw new CustomError('Session is invalid', 401)
            }

            // user data is added to request object
            (req as AuthRequest).user = decoded 
            return next()
            
        } else {
            throw new CustomError('Invalid Bearer token', 400)
        }

    } catch (error) {
        next(error)
    }
}
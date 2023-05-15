import { Request, Response, NextFunction } from "express"

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
        next()
    } else {
        throw new Error('Unauthorized User')
    }
}
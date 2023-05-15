import { Request, Response } from "express"
import { registerUser } from "../dbActions/user"

export const registerUserController = async (req: Request, res: Response) => {
    console.log(req.body)
    const { name, email, password, username } = req.body
    try {

        if (name && email && password && username) {
            let user = await registerUser(name, email, password, username)
            console.log(user[0][0]._status);
            if (user[0][0]._status === 1) {
                res.status(201).send(user)
            } else {
                res.status(400)
                throw new Error(`User with this email or user name already exists !!`)
            }
        } else {
            res.status(400)
            throw new Error('Fill All Fields')
        }
    } catch (error) {
        res.status(400).send(error)
        console.log(error);

    }
}

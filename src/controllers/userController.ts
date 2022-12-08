import User from '../models/userModel'
import express from "express"

interface logInRequest extends express.Request {
    body: { name: any }
}
interface usersRequest extends express.Request {
    body: any
}
interface removeUserRequest extends express.Request {
    params: { id: any; }
}

const logIn = async (req: logInRequest, res: express.Response, next: express.NextFunction) => {
    try {
        const {name} = req.body

        const user = await User.findOne({name})

        if (user) {
            res.status(400).json({message: "there is already a user with the same name"})
        }

        const newUser = new User({name})


        if (!newUser) {
            res.status(400).json({message: "don't create user"})
        }

        await newUser.save()

        res.json({
            id: newUser._id,
            name: newUser.name,
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

const users = async (req: usersRequest, res: express.Response, next: express.NextFunction) => {
    try {

        const users = await User.find({}).exec(function (err, users) {
            if (err) {
                res.status(400).json({message: "don't get user"})
            }

            const improveUsers = users.map(m => ({
                id: m._id,
                name: m.name,
            }))

            res.json({
                item: improveUsers
            })
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

const removeUser = async (req: removeUserRequest, res: express.Response, next: express.NextFunction) => {
    try {
        const id = req.params.id


        const user = await User.findOneAndRemove({_id: id})

        if (!user) {
            res.status(400).json({message: "user doesn't remove"})
        }

        res.json({
            message: "Successful"
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

export {
    logIn,
    users,
    removeUser
}
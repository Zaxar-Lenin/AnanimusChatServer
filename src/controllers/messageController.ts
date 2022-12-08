import Message from '../models/messageModel'
import {Time} from "../assect/func";
import express from "express"

interface addMessageRequest extends express.Request {
    body: { from: any; to: any; message: any; topic: any; }
}
interface getMessagesRequest extends express.Request {
    body: { to: any; from: any; }
}

const addMessage = async (req: addMessageRequest, res:  express.Response, next: express.NextFunction) => {
    try {
        const {from, to, message, topic} = req.body


        const newMessage = new Message({
            message: {
                text: message,
                topic,
            },
            users: [from, to],
            sender: from,
            timeSend: Time(),
        })

        if (!newMessage) {
            res.status(400).json({message: "message failed to add"})
        }

        await newMessage.save()

        res.json({
            message: "Successful"
        })


    } catch (e) {
        console.log(e)
        next(e)
    }
}

const getMessages = async (req: getMessagesRequest, res: express.Response, next: express.NextFunction) => {
    try {
        const {to, from} = req.body


        const messages = await Message.find({
            users: {
                $all: [from, to]
            },
        }).sort({updatedAt: 1}).exec(function (err, users) {
            if (err) {
                res.status(400).json({message: "failed"})
            }
            const updateMessage = users.map(m => {
                if (m.sender && m.message && m.message && m.users) {
                    return {
                        fromSelf: m.sender.toString() === from,
                        message: m.message.text,
                        topic: m.message.topic,
                        time: m.timeSend,
                        usersChat: m.users,
                    }
                } else {
                    return []
                }
            })

            res.json({
                item: updateMessage
            })
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

export {
    addMessage, getMessages

}
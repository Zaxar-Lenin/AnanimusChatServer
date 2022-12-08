import {Router} from "express"
import {addMessage, getMessages} from "../controllers/messageController";

const router = Router()

router.post("/addMes", addMessage)
router.post("/messages", getMessages)

export default router
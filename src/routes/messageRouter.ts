import {Router} from "express"
import {addMessage, getMessages} from "../controllers/messageController";

const router = Router()

router.post("/addMes", addMessage)
router.get("/messages/:from/:to", getMessages)

export default router
import {logIn, removeUser, users} from "../controllers/userController"
import {Router} from "express"

const router = Router()

router.post("/logIn", logIn)
router.get("/users", users)
router.delete("/users/:id", removeUser)

export default router
import { Router } from "express";
import { isAuthenticated } from "../../util/middleware";
import { getGuildsController } from "../../controllers/guildsController"

const router = Router()

router.get('/', isAuthenticated, getGuildsController)

export default router
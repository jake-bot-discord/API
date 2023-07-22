import { Router } from "express";
import passport from "passport";

const router = Router()

router.get('/', passport.authenticate('discord'), (req, res) => {
    res.send(200)
})

router.get('/redirect', passport.authenticate('discord'), (req, res) => {
    res.redirect(process.env.DEFAULT_URL!)
})

router.get('/status', (req, res) => {
    return req.user ? res.status(200).send(req.user) : res.status(401).send({
        msg: "Unauthorized"
    })
})

export default router
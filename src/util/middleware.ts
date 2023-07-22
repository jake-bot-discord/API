import { NextFunction, Request, Response } from "express"

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => req.user ? next() : res.status(403).send("Unauthorized")

export const globalMiddleWare = async (req: Request, res: Response, next: NextFunction) => {
    await console.log(req.headers.token);

    if (req.headers.token == process.env.GLOBAL_TOKEN) {
        console.log("Autorizado")
        return next()
    } else {
        console.log("Não autorizado")
        return res.status(401).send("Access denied")
    }
}
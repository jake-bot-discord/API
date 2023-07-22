import { NextFunction, Request, Response } from "express"

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => req.user ? next() : res.status(403).send("Unauthorized")

export const globalMiddleWare = async (req: Request, res: Response, next: NextFunction) => {
    await console.log(req.headers.token);

    if ( !req.headers.token ) return res.status(401).send("Token not found")

    if (req.headers.token == process.env.GLOBAL_TOKEN) {
        return next()
    } else {
        return res.status(401).send("Access denied")
    }
}
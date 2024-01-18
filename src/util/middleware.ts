import { NextFunction, Request, Response } from "express"

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => req.user ? next() : res.status(403).send("Unauthorized")

export const globalMiddleWare = async (req: Request, res: Response, next: NextFunction) => {
    const protectedPaths: string[] = [
        // "/sharderror",
        // "/host/ligar",
        // "/host/desligar",
        // "/auth",
        // "/guilds",
        // "/payments",
        // "/payments/customer/create",
        // "/payments/customer/retrieve"
    ]

    if (!protectedPaths.includes(req.path)) return next()

    if ( !req.headers.token ) return res.status(401).send("Token not found")

    if (req.headers.token == process.env.GLOBAL_TOKEN) {
        return next()
    } else {
        return res.status(401).send("Access denied")
    }
}
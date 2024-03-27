import fastifyEnv from "@fastify/env";
import fastify from "fastify";
import fs from "fs"
import path from "path";

import { common } from "./routes/common";
import { auth } from "./routes/auth";
import { guilds } from "./routes/guilds";
import { payments } from "./routes/payments";

const schema = {
    type: 'object',
    required: ["PORT", "BOT_ID", "BOT_SECRET", "DISCORD_URL"],
    properties: {
        PORT: {
            type: 'number',
            default: '8080'
        },

        BOT_ID: {
            type: 'number'
        },

        BOT_SECRET: {
            type: 'string'
        },

        DISCORD_URL: {
            type: 'string'
        }
    }
}

const envOptions = {
    confKey: 'config',
    schema,
    dotenv: true,
    data: process.env
}

export const build = (opts = {}) => {
    const app = fastify(opts)

    require("./database/connect")

    app.register(fastifyEnv, envOptions)

    app.register(require("@fastify/cookie"), {
        secret: fs.readFileSync(path.join(__dirname, '../secret-key')),
        hook: 'onRequest',
        parseOptions: {}
    })

    app.register(require("@fastify/secure-session"), {
        sessionName: "session",
        cookieName: "session.id",
        key: fs.readFileSync(path.join(__dirname, '../secret-key')),

        cookie: {
            path: "/",
            expires: 1000 * 60 * 60 * 24
        }
    })

    app.register(require("@fastify/cors"), {
        origin: true,
        credentials: true
    })

    app.register(require("@fastify/multipart"))
       
    app.register(common, { prefix: "/common" })
    app.register(auth, { prefix: "/auth" })
    app.register(guilds, { prefix: "/guilds" })
    app.register(payments, { prefix: "/payments" })

    return app
}
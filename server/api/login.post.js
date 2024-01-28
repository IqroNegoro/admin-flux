import prisma from "~/server/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Roles } from "@prisma/client";
import { object, string } from "yup";

export default defineEventHandler(async e => {
    const body = await readBody(e);

    let {email, password} = await object({
        email: string().required("Please fill a correct email").email("Please fill a correct email"),
        password: string().required("Password required")
    }).validate(body, {abortEarly: false}).catch(err => {
        let errors = {};
        err.inner.forEach(v => {
            errors[v.path] = v.message
        })
        throw createError({
            statusCode: 400,
            message: "Something went wrong",
            data: errors
        })
    });

    const user = await prisma.users.findUnique({
        where: {
            email,
            roles: Roles.ADMIN
        }
    });

    if (!user) throw createError({statusCode: 404, message: "Account doesn't exists"});

    const confirm = bcrypt.compareSync(password, user.password);
    
    if (!confirm) throw createError({statusCode: 404, message: "Account doesn't exists"});
    
    delete user.password;

    const config = useRuntimeConfig();

    const token = jwt.sign(user, config.secret, {
        expiresIn: "15m"
    });
    const refresh = jwt.sign(user, config.refresh, {
        expiresIn: "1d"
    });

    const saving = await prisma.tokens.upsert({
        where: {
            userId: user.id
        },
        create: {
            userId: user.id,
            token: refresh,
            expired: new Date(Date.now() + (1000 * 60 * 60 * 24))
        },
        update: {
            token: refresh,
            expired: new Date(Date.now() + (1000 * 60 * 60 * 24))
        }
    })

    setCookie(e, "token", token, {
        maxAge: 60 * 15,
        httpOnly: process.env.NODE_ENV === 'production', // network purpose
        secure: process.env.NODE_ENV === 'production'
    });
    
    setCookie(e, "refresh", refresh, {
        maxAge: 60 * 60 * 24,
        httpOnly: process.env.NODE_ENV === 'production', // network purpose
        secure: process.env.NODE_ENV === 'production'
    });
                                                    
    return user
})
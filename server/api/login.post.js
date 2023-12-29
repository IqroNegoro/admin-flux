import prisma from "~/server/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import bodyValidator from "../validator/index"
import { Roles } from "@prisma/client";

export default defineEventHandler(async e => {
    const body = await readBody(e);

    const validating = bodyValidator(body).isEmail("email", "Fill correct email!").isEmpty("password", "Password cannot be empty")

    if (validating.hasErr()) {
        throw createError({
            statusCode: 400,
            data: validating.result
        });
    }

    const { email, password } = validating.result

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
        httpOnly: true,
        secure: true
    });
    
    setCookie(e, "refresh", refresh, {
        maxAge: 60 * 60 * 24,
        httpOnly: true,
        secure: true
    });
                                                    
    return user
})
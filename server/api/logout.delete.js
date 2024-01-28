import prisma from "~/server/db";

export default defineEventHandler(async e => {
    const {refresh} = parseCookies(e);

    deleteCookie(e, "token", {
        httpOnly: process.env.NODE_ENV === 'production', // network purpose
        secure: process.env.NODE_ENV === 'production'
    });

    deleteCookie(e, "refresh", {
        httpOnly: process.env.NODE_ENV === 'production', // network purpose
        secure: process.env.NODE_ENV === 'production'
    });

    const saving = await prisma.tokens.update({
        where: {
            userId: e.context.auth.id
        },
        data: {
            token: null,
            expired: null
        }
    });

    setResponseStatus(e, 204);
    
    return {
        message: "Success logout"
    }
})
import prisma from "~/server/db";

export default defineEventHandler(async e => {
    const {refresh} = parseCookies(e);
    deleteCookie(e, "token", {
        httpOnly: true,
        secure: true
    });

    deleteCookie(e, "refresh", {
        httpOnly: true,
        secure: true
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
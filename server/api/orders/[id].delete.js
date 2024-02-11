import prisma from "~/server/db";
import isMongoId from "validator/lib/isMongoId.js";

export default defineEventHandler(async e => {
    if (e.context.auth.email !== 'iqro@gmail.com') throw createError({
        statusCode: 401,
        message: "Forbidden action"
    });

    const { id } = getRouterParams(e, "id");

    if (!isMongoId(id)) throw createError({
        statusCode: 400,
        message: "The ID is not MongoID",
        data: {
            id: "The ID is not MongoID"
        }
    });

    const order = await prisma.transactions.delete({
        where: {
            id
        },
        select: {
            id: true
        }
    });

    return order;
})
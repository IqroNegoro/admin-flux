import prisma from "~/server/db";
import isMongoId from "validator/lib/isMongoId.js";
export default defineEventHandler(async e => {
    const { id } = getRouterParams(e, "id");
    
    if (!isMongoId(id)) throw createError({
        statusCode: 400,
        message: "The ID is not MongoID",
        data: {
            id: "The ID is not MongoID"
        }
    });
    
    const body = await readForm(e);

    const transaction = await prisma.transactions.update({
        where: {
            id
        },
        data: body,
        select: {
            id: true,
            status: true
        }
    });

    return transaction;
})
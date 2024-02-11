import prisma from "~/server/db";
import isMongoId from "validator/lib/isMongoId.js";

export default defineEventHandler(async e => {
    if (e.context.auth.email !== 'iqro@gmail.com') throw createError({
        statusCode: 401,
        message: "Forbidden action"
    });
    
    const {id} = getRouterParams(e, "id");

    if (!isMongoId(id)) throw createError({
        statusCode: 400,
        message: "The ID is not MongoID",
        data: {
            id: "The ID is not MongoID"
        }
    });

    const transactions = await prisma.$transaction([
        prisma.carts.deleteMany({
            where: {
                productId: id
            }
        }),
        prisma.ratings.deleteMany({
            where: {
                productId: id
            }
        }),
        prisma.products.deleteMany({
            where: {id}
        })
    ]);

    return transactions
})
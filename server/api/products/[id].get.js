import prisma from "~/server/db";
import isMongoId from "validator/lib/isMongoId"

export default defineEventHandler(async e => {
    const {id} = getRouterParams(e, "id");
   
    if (!isMongoId(id)) throw createError({
        statusCode: 400,
        message: "The ID is not MongoID",
        data: {
            id: "The ID is not MongoID"
        }
    })

    const product = await prisma.products.findUnique({
        where: {
            id
        }
    });

    if (!product) throw createError({
        statusCode: 404,
        message: "Product not found"
    });

    return product
})
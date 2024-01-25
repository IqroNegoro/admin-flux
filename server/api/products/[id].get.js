import prisma from "~/server/db";
import unescape from "validator/lib/unescape.js";
import isMongoId from "validator/lib/isMongoId.js";

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

    product.description = unescape(product.description)

    return product
})
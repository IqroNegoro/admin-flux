import prisma from "~/server/db";
import isMongoId from "validator/lib/isMongoId.js";

export default defineEventHandler(async e => {
    const { id } = getRouterParams(e);

    if (!isMongoId(id)) throw createError({
        statusCode: 400,
        message: "The ID is not valid",
        data: {
            id: "The ID is not valid"
        }
    })
    
    const category = await prisma.categories.delete({
        where: {
            id
        }
    });
    console.log(category)
    const products = await prisma.products.update({
        where: {
            categoryIds: {
                has: id
            }
        },
        //pull categories from products
        data: {
            pull: {
                categoryIds: id
            }
        }
    });

    return category;
})
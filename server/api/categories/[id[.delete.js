import prisma from "~/server/db";
import isMongoId from "validator/lib/isMongoId.js";

export default defineEventHandler(async e => {
    const { id } = getRouterParams(e);
    if (!isMongoId(id)) {
        throw createError({
            statusCode: 400,
            message: "The ID is not valid",
            data: {
                id: "The ID is not valid"
            }
        })
    }
    const category = await prisma.categories.delete({
        where: {
            id
        }
    });

    return category;
})
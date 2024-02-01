import isMongoId from "validator/lib/isMongoId";
import prisma from "~/server/db";

export default defineEventHandler(async e => {
    const {id} = getRouterParams(e);

    if (!isMongoId(id)) throw createError({
        statusCode: 400,
        message: "The ID is invalid",
        data: {
            id: "The ID is invalid"
        }
    });

    const category = await prisma.categories.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            name: true
        }
    });

    return category;
})
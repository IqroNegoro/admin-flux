import prisma from "~/server/db";
import isMongoId from "validator/lib/isMongoId.js";

export default defineEventHandler(async e => {
    if (e.context.auth.email !== 'iqro@gmail.com') throw createError({
        statusCode: 401,
        message: "Forbidden action"
    });

    const { id } = getRouterParams(e);

    if (!isMongoId(id)) throw createError({
        statusCode: 400,
        message: "The ID is not valid",
        data: {
            id: "The ID is not valid"
        }
    })

    const [category, products] = await prisma.$transaction([
        prisma.categories.delete({
            where: {
                id
            }
        }),
        prisma.$runCommandRaw({
            update: "products",
            updates: [{
                q: {
                    categoryIds: {
                        $oid: id
                    }
                },
                u: {
                    $pull: {
                        categoryIds: {
                            $oid: id
                        }
                    }
                },
                multi: true
            }]
        })
    ])
    
    return category;
})
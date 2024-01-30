import prisma from '~/server/db';

export default defineEventHandler(async e => {
    const { page, limit } = getQuery(e);

    const categories = await prisma.categories.findMany({
        skip: (+limit || 0) * ((+page || 1) - 1),
        take: (+limit || 10) + 1
    });

    const result = {
        data: categories.slice(0,10),
        pagination: {
            next: categories.length > limit,
            prev: page > 1
        }
    }

    console.log(result)

    return result;
})
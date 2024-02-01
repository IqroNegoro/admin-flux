import unescape from 'validator/lib/unescape.js';
import prisma from '~/server/db';

export default defineEventHandler(async e => {
    const { page, limit, q } = getQuery(e);

    let option;

    if (page, limit) { // show all category in add product instead paginating it
        option = {
            skip: (+limit || 0) * ((+page || 1) - 1),
            take: (+limit || 10) + 1
        }
    }

    const query = unescape(q || '');

    const categories = await prisma.categories.findMany({
        where: {
            name: {
                contains: query,
                mode: "insensitive"
            }
        },
        select: {
            id: true,
            name: true
        },
        ...option
    });

    const result = {
        data: option ? categories.slice(0,10) : categories,
        pagination: {
            next: categories.length > limit,
            prev: page > 1
        }
    }
    console.log(result)
    return result;
})
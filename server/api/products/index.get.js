import prisma from "~/server/db";
import unescape from "validator/lib/unescape.js";

export default defineEventHandler(async e => {
    const { q, page, limit } = getQuery(e);

    const query = unescape(q);

    const products = await prisma.products.findMany({
        where: {
            name: {
                contains: query,
                mode: 'insensitive'
            }
        },
        include: {
            categories: true
        },
        skip: (+limit || 0) * ((+page || 1) - 1),
        take: (+limit || 10) + 1
    });

    const result = {
        data: products.slice(0,10),
        pagination: {
            next: products.length > limit,
            prev: page > 1
        }
    }

    console.log(result)
    
    return result;
});
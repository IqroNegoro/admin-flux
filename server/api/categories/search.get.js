import unescape from "validator/lib/unescape.js";
import prisma from "~/server/db";

export default defineEventHandler(async e => {
    const {q, limit, skip, page} = getQuery(e);

    if (!q) return [];
    
    const query = unescape(q);
    
    const categories = await prisma.categories.findMany({
        where: {
            name: {
                contains: query,
                mode: "insensitive"
            }
        },
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

    return categories
});
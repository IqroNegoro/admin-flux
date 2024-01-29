import prisma from "~/server/db";

export default defineEventHandler(async e => {
    const {q} = getQuery(e);
    console.log(q)
    if (!q) return [];
    const products = await prisma.products.findMany({
        where: {
            body: {
                search: q,
                // mode: "insensitive"
            }
        }
    });

    return products
});
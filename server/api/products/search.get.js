import unescape from "validator/lib/unescape.js";
import prisma from "~/server/db";

export default defineEventHandler(async e => {
    const {q} = getQuery(e);
    console.log(q)
    if (!q) return [];

    const query = unescape(q);

    const products = await prisma.products.findMany({
        where: {
            body: {
                search: query,
                // mode: "insensitive"
            }
        }
    });

    return products
});
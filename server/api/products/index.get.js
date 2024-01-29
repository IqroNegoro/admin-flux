import prisma from "~/server/db";

export default defineEventHandler(async e => {
    // const { cursor, type, limit } = getQuery(e);
    // let products = await prisma.products.findMany({
    //     cursor: {
    //         createdAt: cursor
    //     },
    //     orderBy: {
    //         createdAt: type == 'lt' ? "asc" : "desc"
    //     },
    //     take: (+limit || 10) + 1,
    // });

    // const pagination = {
    //     pagination: {
    //         next: type == 'gt' && products.length > 10,
    //         prev: type == 'lt' && products.length > 10
    //     },
    //     data: products.slice(0,limit)
    // }
    // console.log(pagination)

    const products = await prisma.products.findMany();

    return products;
})
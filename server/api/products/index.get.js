import prisma from "~/server/db";

export default defineEventHandler(async e => {
    const products = await prisma.products.findMany();

    return products;
})
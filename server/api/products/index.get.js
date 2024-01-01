import prisma from "~/server/db";

export default defineEventHandler(async e => {
    await new Promise(resolve => setTimeout(() => resolve(), 3000))
    console.log("berak")
    const products = await prisma.products.findMany();

    return products;
})
import prisma from "~/server/db";
import unescape from "validator/lib/unescape.js";

export default defineEventHandler(async e => {
    let products = await prisma.products.findMany();

    products = products.map(v => ({...v, description: unescape(v.description)}))

    return products;
})
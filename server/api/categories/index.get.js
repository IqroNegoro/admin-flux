import prisma from '~/server/db';

export default defineEventHandler(async e => {
    const categories = await prisma.categories.findMany();

    return categories;
})
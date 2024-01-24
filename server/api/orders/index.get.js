import prisma from "~/server/db"
export default defineEventHandler(async e => {
    const transactions = await prisma.transactions.findMany({
        include: {
            user: true
        }
    });

    return transactions;
})
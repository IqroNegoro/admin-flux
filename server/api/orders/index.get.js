import prisma from "~/server/db"
export default defineEventHandler(async e => {
    const transactions = await prisma.transactions.findMany({
        select: {
            id: true,
            orderId: true,
            total: true,
            status: true,
            paymentStatus: true,
            user: {
                select: {
                    name: true
                }
            }
        }
    });

    return transactions;
})
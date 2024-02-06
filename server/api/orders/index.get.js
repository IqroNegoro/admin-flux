import prisma from "~/server/db"
import unescape from "validator/lib/unescape.js";

export default defineEventHandler(async e => {
    const { q, page, limit } = getQuery(e);

    const query = unescape(q);

    const transactions = await prisma.transactions.findMany({
        where: {
            OR: [
                {
                    orderId: {
                        contains: query,
                        mode: "insensitive"
                    }
                },
                {
                    user: {
                        name: {
                            contains: query,
                            mode: "insensitive"
                        }
                    }
                }
            ]
        },
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
        },
        skip: (+limit || 0) * ((+page || 1) - 1),
        take: (+limit || 10) + 1
    });

    const result = {
        data: transactions.slice(0,10),
        pagination: {
            next: transactions.length > limit,
            prev: page > 1
        }
    }

    return result;
})
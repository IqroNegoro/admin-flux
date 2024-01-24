import prisma from "~/server/db";
import moment from "moment";
export default defineEventHandler(async e => {
    const transactions = await prisma.transactions.groupBy({
        by: ["createdAt"],
        where: {
            status: {
                in: ["CREATED", "PENDING", "SUCCESS"]
            }
        },
        _count: {
            status: true
        }
    });

    console.log(transactions)
    const result = {};
    result.dates = transactions.map(v => moment(v.createdAt).format("D"));
    result.series = transactions.map(v => v._count.status);

    return result;
});
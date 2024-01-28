import prisma from "~/server/db";
import { Status } from "@prisma/client";
export default defineEventHandler(async e => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const day = date.getDate();

    const transactions = await prisma.transactions.aggregateRaw({
        pipeline: [
            {
                $match: {
                    // status: Status.SUCCESS,
                    createdAt: {
                        $gt: new Date().toISOString()
                    }
                }
            }
        ]
    });

    console.log(transactions)

    const result = {};
    // result.dates = transactions.map(v => v.updatedAt);
    // result.series = transactions.map(v => v._count.status)

    return result;
});
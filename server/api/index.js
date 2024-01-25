import prisma from "~/server/db";
import { Status } from "@prisma/client";

export default defineEventHandler(async e => {
    const transactions = await prisma.transactions.groupBy({
        by: 'createdAt',
        where: {
            status: Status.SUCCESS
        },
        _count: {
            status: true
        }
    });

    const result = {};
    result.dates = transactions.map(v => v.createdAt);
    result.series = transactions.map(v => v._count.status)
   
    return result;
});
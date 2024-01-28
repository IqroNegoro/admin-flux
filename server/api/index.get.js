import prisma from "~/server/db";
import { Status } from "@prisma/client";
import moment from "moment";
export default defineEventHandler(async e => {
    await new Promise(resolve => setTimeout(() => resolve(), 1500))
    // const date = new Date();
    // const year = date.getFullYear();
    // const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    // const day = date.getDate();

    const transactions = await prisma.transactions.groupBy({
        by: 'updatedAt',
        where: {
            status: Status.SUCCESS,
            // updatedAt: {
            //     lte: moment.ISO_8601(Date.now()),
            //     gte: moment.ISO_8601(`${year}/${month}/01`)
            // }
        },
        _count: {
            status: true
        }
    });

    const result = {};
    result.dates = transactions.map(v => v.updatedAt);
    result.series = transactions.map(v => v._count.status)

    return result;
});
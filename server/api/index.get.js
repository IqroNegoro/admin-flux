import prisma from "~/server/db";
import {Status} from "@prisma/client";

export default defineEventHandler(async e => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const day = date.getDate();

    const dashboard = await prisma.transactions.groupBy({
        by: ["createdAt", "status"],
        where: {
            status: Status.SUCCESS,
            createdAt: {
                lte: new Date().toISOString(),
                gte: new Date(`01/${month}/${year}`).toISOString()
            }
        },
        _count: {
            status: true
        }
    });

    const transactions = await prisma.transactions.findMany({
        where: {
            status: Status.SUCCESS,
            createdAt: {
                lte: new Date().toISOString(),
                gte: new Date(`01/${month}/${year}`).toISOString()
            }
        },
        select: {
            total: true
        }
    });

    console.log(dashboard)

    const result = {};
    result.rate = transactions.reduce((prev, next) => prev + next.total,0);
    result.totalOrders = transactions.length;

    return result;
});
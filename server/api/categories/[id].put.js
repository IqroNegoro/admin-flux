import prisma from "~/server/db";
import isMongoId from "validator/lib/isMongoId.js";
import { object, string } from "yup";

export default defineEventHandler(async e => {
    const {id} = getRouterParams(e);

    if (!isMongoId(id)) throw createError({
        statusCode: 400,
        message: "The ID is invalid",
        data: {
            id: "The ID is invalid"
        }
    });

    const body = await readForm(e);
    
    const data = await object({
        name: string().required("Please fill the category name").trim()
    }).validate(body, {abortEarly: false}).catch(err => {
        let errors = {};
        err.inner.forEach(v => {
            errors[v.path] = v.message
        })
        throw createError({
            statusCode: 400,
            message: "Something went wrong",
            data: errors
        }) 
    });

    const category = await prisma.categories.update({
        where: {
            id
        },
        data,
        select: {
            id: true,
            name: true
        }
    });

    return category;
})
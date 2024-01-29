import prisma from "~/server/db";
import { object, string, number, boolean } from "yup";

export default defineEventHandler(async e => {
    const body = await readForm(e);

    const result = await object({
        name: string().required("Please fill the category name").trim(),
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

    const category = await prisma.categories.create({
        data: body
    });

    setResponseStatus(e, 201)

    return category
})
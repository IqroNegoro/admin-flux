import prisma from "~/server/db";
import { object, string } from "yup";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";

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
        data: body,
        select: {
            id: true,
            name: true
        }
    }).catch(err => {
        let message = "Something went wrong when creating category";

        if (err instanceof PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                message = "Category has already created"
            }
        }
        
        throw createError({
            statusCode: 500,
            message
        })
    });

    setResponseStatus(e, 201)

    return category
})
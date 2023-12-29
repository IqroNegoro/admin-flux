import prisma from "~/server/db";
import bcrypt from "bcrypt";
import validator from "validator";
import bodyValidator from "../validator/index";

export default defineEventHandler(async e => {
    let body = await readBody(e);

    const validating = bodyValidator(body).isEmpty("name", "Please fill name").isEmail("email", "Fill correct email!").isLength("password", {min: 4}, "Password cannot less than 4 characters").isAlpha("name", "Fill correct name!")

    if (validating.hasErr()) {
        throw createError({
            statusCode: 400,
            data: validating.result
        })
    }

    let {email, password, name} = validating.result;

    if (await prisma.users.findUnique({
        where: {
            email
        }
    })) {
        return createError({
            statusCode: 409,
            message: "Email already in use",
        })
    };
    
    password = bcrypt.hashSync(password, 10);

    const users = await prisma.users.create({
        data: {
            ...validating.result
        },
        select: {
            email: true,
            name: true,
        }
    });
    setResponseStatus(e, 201);
    return users
})
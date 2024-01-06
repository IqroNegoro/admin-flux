import readFile from "~/server/utils/readFile";
import prisma from "~/server/db";
import { AttachmentBuilder } from "discord.js";
import bodyValidator from "~/server/validator";
import isMongoId from "validator/lib/isMongoId"

export default defineEventHandler(async e => {
    const {id} = getRouterParams(e, "id");

    if (!isMongoId(id)) throw createError({
        statusCode: 400,
        message: "The ID is not MongoID",
        data: {
            id: "The ID is not MongoID"
        }
    });

    let req = await readFile(e);
    console.log(req)

    const validating = bodyValidator(req)
    .isEmpty("name", "Product name cannot be empty")
    .isEmpty("price", "Product price cannot be empty")
    .isNum("price", "Please fill correct price!")
    .isNum("stock", "Please fill correct stock!")

    if (validating.hasErr()) throw createError({
        statusCode: 400,
        data: validating.result
    })

    req = validating.result;

    if (req.image) {
        const {client} = useNitroApp();
        const config = useRuntimeConfig();
        const channel = client.channels.cache.get(config.channelId);
        let attachment = new AttachmentBuilder(req.image.data).setName(req.image.filename).setDescription(req.image.filename);
        let sending = await channel.send({
            content: `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}, ${e.context.auth.name}`,
            files: [attachment],
        }).catch(err => {
            return err
        });
        let [firstImages] = sending.attachments.values();
        req.image = firstImages.url
    }

    const product = await prisma.products.update({
        where: {id},
        data: req
    });

    setResponseStatus(e, 200);

    return {
        message: "Success update product",
        data: product
    }
})
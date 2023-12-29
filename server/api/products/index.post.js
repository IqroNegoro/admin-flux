import readFile from "~/server/utils/readFile";
import prisma from "~/server/db";
import { AttachmentBuilder } from "discord.js";
import bodyValidator from "~/server/validator";

export default defineEventHandler(async e => {
    let req = await readFile(e);

    const validating = bodyValidator(req).isEmpty("name", "Product name cannot be empty")
    // .isEmpty("price", "Product price cannot be empty");

    if (validating.hasErr()) throw createError({
        statusCode: 400,
        data: validating.result
    })

    req = validating.result;

    console.log(req)

    if (req.image) {
        const {client} = useNitroApp();
        const config = useRuntimeConfig();
        const channel = client.channels.cache.get(config.channelId);
        let attachment = new AttachmentBuilder(req.image.data).setName(req.image.filename).setDescription(req.image.filename);
        let sending = await channel.send({
            content: `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}, ${"berak"}`,
            files: [attachment],
        }).catch(err => {
            return err
        });
        let [firstImages] = sending.attachments.values();
        req.image = firstImages.url
    }

    const product = await prisma.products.create({
        data: req
    });

    setResponseStatus(e, 201);

    return {
        message: "Success create new product",
        data: product
    }
})
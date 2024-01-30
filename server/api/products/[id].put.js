import readFile from "~/server/utils/readFile";
import prisma from "~/server/db";
import { AttachmentBuilder } from "discord.js";
import isMongoId from "validator/lib/isMongoId.js"
import unescape from "validator/lib/unescape.js";
import { object, string, number, boolean } from "yup";

export default defineEventHandler(async e => {
    const {id} = getRouterParams(e, "id");

    if (!isMongoId(id)) throw createError({
        statusCode: 400,
        message: "The ID is not MongoID",
        data: {
            id: "The ID is not MongoID"
        }
    });

    let body = await readFile(e);

    let data = await object({
        image: object().typeError("Please put the product image"),
        name: string().required("Please fill the product name").trim(),
        sub: string().required("Please fill the product sub text").trim(),
        weight: number().typeError("Please fill stock the product").required("Please fill weight of product").min(0),
        available: boolean().default(false),
        published: boolean().default(false),
        price: number().typeError("Please fill price the product").required("Please fill price the product").min(0).max(99999999, max => `Price must less then or equal to ${formatRp(max.max)}`),
        description: string().nullable().ensure().trim()
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
    })

    if (data.image) {
        const {client} = useNitroApp();
        const config = useRuntimeConfig();
        const channel = client.channels.cache.get(config.channelId);
        let attachment = new AttachmentBuilder(data.image.data).setName(data.image.filename).setDescription(data.image.filename);
        let sending = await channel.send({
            content: `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}, ${e.context.auth.name}`,
            files: [attachment],
        }).catch(err => {
            return err
        });
        let [firstImages] = sending.attachments.values();
        data.image = firstImages.url
    }

    const product = await prisma.products.update({
        where: {id},
        data
    });

    product.description = unescape(product.description)

    setResponseStatus(e, 200);

    return product
})
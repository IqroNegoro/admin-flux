import readFile from "~/server/utils/readFile";
import prisma from "~/server/db";
import { AttachmentBuilder } from "discord.js";
import isMongoId from "validator/lib/isMongoId.js"
import unescape from "validator/lib/unescape.js";
import { object, string, number, boolean, array } from "yup";

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
        newImages: array().nullable(),
        images: array().typeError("Please put the product image"),
        name: string().required("Please fill the product name").ensure().trim(),
        sub: string().required("Please fill the product sub text").ensure().trim(),
        weight: number().min(0).typeError("Please fill stock the product").required("Please fill weight of product"),
        stock: number().min(0).typeError("Please fill stock the product").required("Please fill weight of product"),
        published: boolean().default(false),
        price: number().min(0).typeError("Please fill price the product").required("Please fill price the product").max(99999999, max => `Price must less then or equal to ${formatRp(max.max)}`),
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

    if (data.newImages) {
        const {client} = useNitroApp();
        const config = useRuntimeConfig();
        const channel = client.channels.cache.get(config.channelId);
        for (let image in data.newImages) {
            if (!data.newImages[image]) continue;
            let attachment = new AttachmentBuilder(data.newImages[image].data).setName(data.newImages[image].filename).setDescription(data.newImages[image].filename);
            let sending = await channel.send({
                content: `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}, ${e.context.auth.name}`,
                files: [attachment],
            }).catch(err => {
                return err
            });
            let [firstImages] = sending.attachments.values();
            data.images[image] = firstImages.url
            // lanjutin update image sesuai index
        }
        data.images = data.images.filter(v => v)
    }

    const categoryIds = data.categories
    
    delete data.categories;
    delete data.newImages;

    const product = await prisma.products.update({
        where: {id},
        data: {
            ...data,
            categoryIds
        }
    });

    product.description = unescape(product.description)

    setResponseStatus(e, 200);

    return product
})
import readFile from "~/server/utils/readFile";
import prisma from "~/server/db";
import { AttachmentBuilder } from "discord.js";
import { object, string, number, boolean, array } from "yup";

export default defineEventHandler(async e => {
    const body = await readFile(e);

    let req = await object({
        image: object().typeError("Please put the product image"),
        name: string().required("Please fill the product name").trim(),
        sub: string().required("Please fill the product sub text").trim(),
        weight: number().typeError("Please fill stock the product").required("Please fill weight of product").min(0),
        stock: number().typeError("Please fill stock the product").required("Please fill weight of product").min(0),
        published: boolean().default(false),
        categories: array().required("Please select min 1 category of product"),
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

    console.log(Array.isArray(req.categories))

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
    const categoryIds = req.categories
    delete req.categories; // prisma m-n problem maybe
    const product = await prisma.products.create({
        data: {...req, categoryIds}
    });

    setResponseStatus(e, 201);

    return product
})
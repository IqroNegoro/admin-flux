import readFile from "~/server/utils/readFile";
import prisma from "~/server/db";
import { AttachmentBuilder } from "discord.js";
import { object, string, number, boolean, array } from "yup";

export default defineEventHandler(async e => {
    const body = await readFile(e);
    console.log(body);

    let req = await object({
        images: array().typeError("Please put the product image"),
        name: string().required("Please fill the product name").ensure().trim(),
        sub: string().required("Please fill the product sub text").ensure().trim(),
        weight: number().min(0).typeError("Please fill stock the product").required("Please fill weight of product"),
        stock: number().min(0).typeError("Please fill stock the product").required("Please fill weight of product"),
        published: boolean().default(false),
        categories: array().required("Please select min 1 category of product"),
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

    if (req.images) {
        const images = [];
        const {client} = useNitroApp();
        const config = useRuntimeConfig();
        const channel = client.channels.cache.get(config.channelId);
        for (let image of req.images) {
            let attachment = new AttachmentBuilder(image.data).setName(image.filename).setDescription(image.filename);
            let sending = await channel.send({
                content: `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}, ${e.context.auth.name}`,
                files: [attachment],
            }).catch(err => {
                return err
            });
            let [firstImages] = sending.attachments.values();
            images.push(firstImages.url);
        }
        req.images = images;
    }
    const categoryIds = req.categories
    delete req.categories; // prisma m-n problem maybe
    const product = await prisma.products.create({
        data: {...req, categoryIds}
    });

    setResponseStatus(e, 201);

    return product
})
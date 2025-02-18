import { PrismaClient } from "@prisma/client";
import { categories } from "./data/categories";
import { products } from "./data/products";

const primsa = new PrismaClient()

async function main() {
    try {
        await primsa.category.createMany({
            data: categories
        })
        await primsa.product.createMany({
            data: products
        })
    } catch (error) {
        console.log(error)
    }

}

main()
    .then(async () => {
        await primsa.$disconnect()
    })
    .catch(async (e) => {
        console.log(e)
        await primsa.$disconnect()
        process.exit(1)
    })
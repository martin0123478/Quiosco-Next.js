import { prisma } from "@/src/lib/prisma"
import { notFound, redirect } from "next/navigation"

async function getProductsByID(id: number) {
    const product = await prisma.product.findUnique({
        where: {
            id
        }
    })
    if (!product) {
        notFound()
    }
    return product
}

export default async function EditProductsPage({ params }: { params: { id: string } }) {
    const product = await getProductsByID(+params.id)
    console.log(product)
    return (
        <div>
            EditProductsPage
        </div>
    )
}

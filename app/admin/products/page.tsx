import { ProductPagination } from "@/components/products/ProductPagination";
import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import { redirect, RedirectType } from "next/navigation";


async function productCount() {
    return await prisma.product.count()
}
async function getProducts(page: number, pageSize: number) {
    const skip = (page - 1) * 10
    const products = await prisma.product.findMany({
        take: pageSize,
        skip,
        include: {
            category: true
        }
    })
    return products

}
export default async function ProductsPage({ searchParams }: { searchParams: { page: string } }) {

    const page = +searchParams.page || 1
    const pageSize = 10
    const products = await getProducts(page, pageSize)
    const totalProducts = await productCount()
    const totalPages = Math.ceil(totalProducts / pageSize)
    if (page > totalPages) {
        redirect('/admin/products')
    }



    return (
        <>
            <Heading>
                Administrar Productos
            </Heading>
            <ProductTable products={products} />
            <ProductPagination page={page} totalPages={totalPages} />
        </>

    )
}

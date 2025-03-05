import { ProductPagination } from "@/components/products/ProductPagination";
import { ProductSearchForm } from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
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
export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>
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
            <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
                <Link href='/admin/products/new'
                    className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer">
                    Crear Producto
                </Link>
                <ProductSearchForm />
            </div>
            <ProductTable products={products} />
            <ProductPagination page={page} totalPages={totalPages} />
        </>

    )
}

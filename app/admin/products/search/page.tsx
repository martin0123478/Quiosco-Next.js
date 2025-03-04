import { ProductSearchForm } from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";

async function searchProduct(searchTerm: string) {
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: searchTerm,
                mode: 'insensitive'
            }


        },
        include: {
            category: true
        }
    })
    return products
}

export default async function SearchPage({ searchParams }: { searchParams: { search: string } }) {


    const products = await searchProduct(searchParams.search)

    return (
        <>
            <Heading>
                Resultados de Busqueda
            </Heading>
            <div className="flex flex-col gap-5 lg:flex-row lg:justify-end">

                <ProductSearchForm />
            </div>

            {
                products.length ? (
                    <ProductTable products={products} />
                ) :
                    <p className="text-center text-lg">No hay productos</p>
            }

        </>
    )
}
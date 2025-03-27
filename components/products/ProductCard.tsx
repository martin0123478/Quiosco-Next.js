import { Product } from "@prisma/client"
import Image from "next/image"
import AddProductButton from "./AddProductButton"
import { getImagePath } from "@/src/utils"

type ProductCardProps = {
    product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const imagePath = getImagePath(product.image)
    return (
        <div className="border bg-white">
            <Image
                src={imagePath}
                alt={`${product.name}`}
                width={400} height={500}
            />
            <div className="p-5 ">
                <h3 className="text-2xl font-bold">{product.name}</h3>
                <p className="mt-5 font-black text-4xl text-amber-500">${product.price}</p>
                <AddProductButton product={product} />
            </div>

        </div>
    )
}

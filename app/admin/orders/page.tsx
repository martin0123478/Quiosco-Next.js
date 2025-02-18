import OrderCard from '@/components/order/OrderCard'
import Heading from '@/components/ui/Heading'
import { prisma } from '@/src/lib/prisma'

async function getPendingOrders() {
    const order = await prisma.order.findMany({
        where: {
            status: false
        },
        include: {
            orderProducts: {
                include: {
                    product: true
                }
            }
        }
    })
    return order
}

export default async function page() {
    const order = await getPendingOrders()

    return (
        <>
            <Heading>
                Administrar Ordenes
            </Heading>
            {
                order.length ? (
                    <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-5'>
                        {order.map(order => (
                            <OrderCard
                                key={order.id}
                                order={order} />
                        ))}
                    </div>
                ) : <p className='text-center' > No hay Ordenes Pendientes</p>


            }
        </>
    )
}

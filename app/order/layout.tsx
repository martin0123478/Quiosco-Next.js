import OrderSummary from "@/components/OrderSummary";
import OrdeSidebar from "@/components/order/OrdeSidebar";
import ToastNotification from "@/components/ui/ToastNotification";

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            <div className="md:flex">
                <OrdeSidebar />

                <main className="md:flex-1 md:h-screen md:overflow-y-scroll">
                    {children}
                </main>
                <OrderSummary />
            </div>
            <ToastNotification />
        </>

    )
}
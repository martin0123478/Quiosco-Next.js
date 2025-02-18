"use client"
import Link from "next/link";
import { usePathname } from "next/navigation"
type AdminRoutesProps = {
    link: {
        url: string;
        text: string;
        blank: boolean;
    }
}
export default function AdminRoutes({ link }: AdminRoutesProps) {
    const pathname = usePathname()
    const isActive = pathname.startsWith(link.url)
    return (
        <Link href={link.url} className={`${isActive ? 'bg-amber-400' : ''} font-bold text-lg border-gray-200 p-3 last-of-type:border-b`}
            target={link.blank ? '_blank' : ''}>

            {link.text}
        </Link>
    )
}

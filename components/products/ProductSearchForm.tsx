"use client"
import { SearchSquema } from '@/src/schema'
import { redirect, useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'

export const ProductSearchForm = () => {
    const router = useRouter()
    const handleSearchForm = (formData: FormData) => {
        const data = {
            search: formData.get('search')
        }
        const result = SearchSquema.safeParse(data)
        if (!result.success) {
            result.error.issues.forEach(issue => {
                toast.error(issue.message)
            })
            return
        }
        router.push(`/admin/products/search?search=${result.data.search}`)
    }
    return (
        <form action={handleSearchForm} className='flex items-center'>
            <input type="text" placeholder='Buscar Producto'
                className='p-2 placeholder-gray-400 w-full'
                name='search' />
            <input type="submit"
                value={'buscar'}
                className='bg-indigo-600 p-2 uppercase text-white cursor-pointer' />
        </form>
    )
}

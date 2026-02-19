'use client'

import { useState } from 'react'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import { useUserAddress } from '@/hooks/useAddress'
import { useGetOrder } from '@/hooks/useOrder'
import { OrderItem } from '@/types/order'
import { useParams } from 'next/navigation'
import ChangeData from './changeData'

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false)

    const params = useParams()


    const { data: session, status } = useSession()
    const { data: userAddress } = useUserAddress()
    const { data: userOrders, isLoading } = useGetOrder(params.userId)

    if (status === 'loading') return null



    const user = {
        name: session?.user.name,
        email: session?.user.email,
    }

    return (
        <div className="relative container min-h-screen bg-slate-100 p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Profile */}
                <div className="bg-slate-200 rounded-2xl shadow-sm p-6 h-fit">
                    <h2 className="text-lg font-semibold mb-4">Profile</h2>

                    <div className="space-y-2">
                        <p className="text-slate-500 text-sm">Name</p>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-slate-500 text-sm">Email</p>
                        <p className="font-medium">{user.email}</p>

                        <p className="text-slate-500 text-sm mt-4">
                            Shipping Address
                        </p>

                        {userAddress?.data?.length ? (
                            userAddress.data.map((addr) => (
                                <p key={addr._id} className="font-medium">
                                    {addr.city} &gt; {addr.details} &gt; {addr.phone}
                                </p>
                            ))
                        ) : (
                            <p className="font-medium">No address available</p>
                        )}
                    </div>

                    <button
                        onClick={() => setIsEditing(true)}
                        className="mt-6 w-full bg-blue-500 text-slate200bg-slate-200 py-2 rounded-xl hover:bg-blue-600 transition"
                    >
                        Edit Profile
                    </button>
                </div>

                {/* Orders */}
                <div className="lg:col-span-2 bg-slate-200 rounded-2xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold mb-4">My Orders</h2>

                    <div className="space-y-6">
                        {isLoading ? (
                            <p className="text-slate-500">Loading orders…</p>
                        ) : Array.isArray(userOrders) && userOrders.length ? (
                            userOrders.map((order: OrderItem) => (
                                <div
                                    key={order._id}
                                    className="border border-slate-200 rounded-xl p-5 space-y-4"
                                >
                                    {/* Header */}
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium">Order #{order.id}</p>
                                            <p className="text-slate-400 text-sm">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>

                                        <p className="font-semibold text-blue-500">
                                            EGP {order.totalOrderPrice}
                                        </p>
                                    </div>

                                    {/* Status */}
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={clsx(
                                                'px-3 py-1 rounded-full text-xs font-medium',
                                                order.isDelivered
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-yellow-400 text-yellow-700'
                                            )}
                                        >
                                            {order.isDelivered ? 'Delivered' : 'On the way!'}
                                        </span>
                                    </div>

                                    {/* Cart Items */}
                                    <div className="space-y-3">
                                        {order.cartItems.map((item) => (
                                            <div
                                                key={item._id}
                                                className="flex justify-between text-sm border-b last:border-b-0 pb-2"
                                            >
                                                <div>
                                                    <p className="font-medium">
                                                        {item.product.title}
                                                    </p>
                                                    <p className="text-slate-400">
                                                        Qty: {item.count}
                                                    </p>
                                                </div>

                                                <p className="font-medium">
                                                    EGP {item.price}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-slate-500">No orders found.</p>
                        )}
                    </div>
                </div>

            </div>

            {/* Overlay */}
            <div
                className={clsx(
                    'fixed inset-0 bg-black/30 transition-opacity',
                    isEditing ? 'opacity-100' : 'opacity-0 pointer-events-none'
                )}
                onClick={() => setIsEditing(false)}
            />

            {/* Sidebar */}
            <ChangeData
                isEditing={isEditing}
                setIsEditing={setIsEditing}
            />
        </div>
    )
}

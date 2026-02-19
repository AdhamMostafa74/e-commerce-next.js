"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useGetCart } from "@/hooks/useCart"
import { useState } from "react"
import { useCashPayment, useOnlinePayment } from "@/hooks/useCheckout"
import { useRouter } from "next/navigation"
import { useAddAddress } from "@/hooks/useAddress"



/* ---------------- Schema ---------------- */
const checkoutSchema = z.object({
    details: z.string().min(5),
    phone: z.string().min(8),
    city: z.string().min(2),
})


export type CheckoutFormData = z.infer<typeof checkoutSchema>

export default function Checkout() {
    const [PaymentMethod, setpaymentMethod] = useState<'cash' | 'online'>('cash')

    const { data: cartData } = useGetCart()
    const router = useRouter()

    const form = useForm<CheckoutFormData>({
        resolver: zodResolver(checkoutSchema),
        mode: "onChange",
        defaultValues: {
            details: "",
            phone: "",
            city: "",
        },
    })

    const { mutate: cashPayment } = useCashPayment()
    const { mutate: onlinePayment, data: responseData } = useOnlinePayment()
    const { mutate: addAddress } = useAddAddress()

    const onSubmit = (data: CheckoutFormData) => {
        if (PaymentMethod === 'cash') {
            cashPayment({ cartId: cartData?.cartId, formData: data })
            addAddress({ name: 'Home', formData: data })
            setTimeout(() => {
                router.push("/home")
            }, 2000);
        } else {
            onlinePayment({ cartId: cartData?.cartId, formData: data })
            addAddress({ name: 'Home', formData: data })
            console.log(responseData)
        }
    }


    return (
        <div className="min-h-screen bg-slate-100 py-10">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Shipping Address Form */}
                <Card className="lg:col-span-2 bg-slate-200 p-6 shadow-md">
                    <CardHeader>
                        <CardTitle className="text-2xl sm:text-3xl text-center">
                            Shipping Address
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
                                {/* Address Details */}
                                <FormField
                                    control={form.control}
                                    name="details"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Address Details</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Street, building, apartment..."
                                                    {...field}
                                                    className="sm:h-14 focus:border-gray-500"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Phone */}
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="01XXXXXXXXX"
                                                    {...field}
                                                    className="sm:h-14 focus:border-gray-500"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* City */}
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>City</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Cairo"
                                                    {...field}
                                                    className="sm:h-14 focus:border-gray-500"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Payment Method */}

                                <FormLabel>Payment Method</FormLabel>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Cash */}
                                    <button
                                        type="button"
                                        onClick={() => setpaymentMethod("cash")}
                                        className={`rounded-lg border p-4 text-left transition${PaymentMethod === "cash"
                                            ? "border-blue-500 bg-blue-200"
                                            : "border-slate-500 bg-white hover:bg-slate-50"}`}>
                                        <p className="font-medium">Cash on Delivery</p>
                                        <p className="text-sm text-gray-600">
                                            Pay when your order arrives
                                        </p>
                                    </button>

                                    {/* Online */}
                                    <button
                                        type="button"
                                        onClick={() => setpaymentMethod("online")}
                                        className={`rounded-lg border p-4 text-left transition${PaymentMethod === "online"
                                            ? "border-blue-500 bg-blue-200"
                                            : "border-slate-300 bg-white hover:bg-slate-50"}`}>
                                        <p className="font-medium">Online Payment</p>
                                        <p className="text-sm text-gray-600">
                                            Pay securely with card
                                        </p>
                                    </button>
                                </div>

                                <FormMessage />


                                <Button
                                    type="submit"
                                    className="w-full h-10 sm:h-11 bg-blue-500 text-lg hover:bg-blue-600"
                                    disabled={!form.formState.isValid}
                                >
                                    Checkout
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>

                {/* Order Summary */}
                <Card className="bg-slate-200 p-6 shadow-md h-fit">
                    <CardHeader>
                        <CardTitle className="text-xl">Order Summary</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3 text-sm">

                        {cartData?.data.products.map((item) => (
                            <div
                                key={item._id}
                                className="grid grid-cols-[1fr_120px] items-center gap-6"
                            >
                                {/* Product title */}
                                <span >
                                    {item.product.title} × {item.count}
                                </span>

                                {/* Price (LEFT aligned) */}
                                <span className="font-bold text-lg whitespace-nowrap text-left">
                                    EGP {(item.price * item.count).toFixed(2)}
                                </span>
                            </div>
                        ))}

                        {/* Shipping */}
                        <div className="grid grid-cols-[1fr_120px] items-center gap-6">
                            <span>Shipping</span>
                            <span className="font-bold text-lg text-left">Free</span>
                        </div>

                        <hr className="border-slate-300" />

                        {/* Total */}
                        <div className="grid grid-cols-[1fr_120px] items-center gap-6 font-semibold text-base">
                            <span>Total</span>
                            <span className="text-left">
                                EGP {cartData?.data.totalCartPrice}
                            </span>
                        </div>

                    </CardContent>

                </Card>

            </div>
        </div>
    )
}

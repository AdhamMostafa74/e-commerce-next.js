'use client'

import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff, Pencil, Trash, X } from 'lucide-react'
import { useChangeInfo, useChangePassword } from '@/hooks/useInfoChange'
import { Address } from '@/types/address'
import { useAddAddress, useRemoveAddress, useUserAddress } from '@/hooks/useAddress'
import { CheckoutFormData } from '@/app/checkout/page'

/* ================= Schemas ================= */

const personalSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.email('Invalid email'),
    phone: z.string().min(1, 'Phone is required'),
})

const passwordSchema = z
    .object({
        currentPassword: z.string().min(8, 'Required'),
        password: z.string().min(8, 'Minimum 8 characters'),
        rePassword: z.string().min(8, 'Required'),
    })
    .refine((data) => data.password === data.rePassword, {
        message: 'Passwords do not match',
        path: ['rePassword'],
    })

type ChangeDataProps = {
    isEditing: boolean
    setIsEditing: (value: boolean) => void
}

export type PersonalDataForm = z.infer<typeof personalSchema>
export type PasswordForm = z.infer<typeof passwordSchema>

export default function ChangeData({ isEditing, setIsEditing }: ChangeDataProps) {

    // states


    const [openCard, setOpenCard] = useState<'data' | 'password' | 'address' | null>(null)
    const { data: session } = useSession()
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    })

    // hooks

    const { mutate: changeInfo } = useChangeInfo()
    const { mutate: changePassword } = useChangePassword()
    const { mutate: addUserAddress } = useAddAddress()
    const { mutate: deleteUserAddress } = useRemoveAddress()
    const { data: userAdresses } = useUserAddress()


    /* ================= Forms ================= */

    const personalForm = useForm<PersonalDataForm>({
        resolver: zodResolver(personalSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
        },
    })

    const passwordForm = useForm<PasswordForm>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: '',
            password: '',
            rePassword: '',
        },
    })


    // ===== Addresses state =====
    const [editingAddressId, setEditingAddressId] = useState<string | null>(null)

    const addressSchema = z.object({
        name: z.string().min(1, 'Required'),
        details: z.string().min(1, 'Required'),
        phone: z.string().min(1, 'Required'),
        city: z.string().min(1, 'Required'),
    })

    type AddressForm = z.infer<typeof addressSchema>

    const addressForm = useForm<AddressForm>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            name: '',
            details: '',
            phone: '',
            city: '',
        },
    })

    // TEMP data (replace with API later)


    const handleEditAddress = (addr: Address) => {
        setEditingAddressId(addr._id)
        addressForm.reset(addr)
    }
    const handleDeleteAddress = (addressId: string) => {
        deleteUserAddress(addressId)
    }

    const submitAddress = (data: AddressForm) => {
        const address: CheckoutFormData = {
            city: data.city,
            details: data.details,
            phone: data.phone
        }
        console.log(
            editingAddressId ? { id: editingAddressId, ...data } : data
        )
        addUserAddress({ formData: address, name: data.name })
        toast.success(
            editingAddressId ? 'Address updated' : 'Address added'
        )
        addressForm.reset()
        setEditingAddressId(null)
    }

    /* ================= Autofill ================= */

    useEffect(() => {
        if (session?.user) {
            personalForm.reset({
                name: session.user.name ?? '',
                email: session.user.email ?? '',
                phone: '',
            })
        }
    }, [session, personalForm])

    /* ================= Submit Handlers ================= */

    const submitPersonalData = async (data: PersonalDataForm) => {
        try {
            // 🔌 API later
            changeInfo(data)
            toast.success('Profile updated successfully')
            setOpenCard(null)
        } catch {
            toast.error('Something went wrong')
        }
    }

    const submitPasswordData = async (data: PasswordForm) => {
        try {
            // 🔌 API later
            changePassword(data)
            toast.success('Password updated successfully')
            passwordForm.reset()
            setOpenCard(null)
        } catch {
            toast.error('Failed to update password')
        }
    }

    return (
        <div
            className={clsx(
                'fixed z-50 top-0 right-0 h-lvh w-full sm:w-105 bg-slate-200 shadow-lg p-6 transition-transform duration-600 overflow-y-auto',
                isEditing ? 'translate-x-0' : 'translate-x-full'
            )}
        >
            <div className='flex items-center mb-6 justify-between align-middle'>
                <h2 className=" text-xl font-semibold ">Edit Profile</h2>
                <X color='red' size={30} onClick={() => setIsEditing(false)} />

            </div>

            {/* ================= Change Personal Data ================= */}
            <div className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden">
                <button
                    onClick={() =>
                        setOpenCard(openCard === 'data' ? null : 'data')
                    }
                    className="w-full flex justify-between items-center p-5 text-left"
                >
                    <span className="font-medium">Change Personal Data</span>
                    <span
                        className={clsx(
                            'transition-transform duration-600',
                            openCard === 'data' && 'rotate-180'
                        )}
                    >
                        ▼
                    </span>
                </button>

                <div
                    className={clsx(
                        'transition-all duration-600 ease-in-out overflow-hidden',
                        openCard === 'data'
                            ? 'max-h-125 opacity-100'
                            : 'max-h-0 opacity-0'
                    )}
                >
                    <div className="p-5 pt-0 space-y-4">
                        <Form {...personalForm}>
                            <form
                                onSubmit={personalForm.handleSubmit(
                                    submitPersonalData
                                )}
                                className="space-y-4"
                            >
                                <FormField
                                    control={personalForm.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={personalForm.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />



                                <Button
                                    type="submit"
                                    disabled={personalForm.formState.isSubmitting}
                                    className="w-full bg-blue-500 hover:bg-blue-600"
                                >
                                    {personalForm.formState.isSubmitting
                                        ? 'Saving...'
                                        : 'Save Changes'}
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>

            {/* ================= Change Password ================= */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <button
                    onClick={() =>
                        setOpenCard(
                            openCard === 'password' ? null : 'password'
                        )
                    }
                    className="w-full flex justify-between items-center p-5 text-left"
                >
                    <span className="font-medium">Change Password</span>
                    <span
                        className={clsx(
                            'transition-transform duration-600',
                            openCard === 'password' && 'rotate-180'
                        )}
                    >
                        ▼
                    </span>
                </button>

                <div
                    className={clsx(
                        'transition-all duration-600 ease-in-out overflow-hidden',
                        openCard === 'password'
                            ? 'max-h-125 opacity-100'
                            : 'max-h-0 opacity-0'
                    )}
                >
                    <div className="p-5 pt-0 space-y-4">
                        <Form {...passwordForm}>
                            <form
                                onSubmit={passwordForm.handleSubmit(
                                    submitPasswordData
                                )}
                                className="space-y-4"
                            >
                                <FormField
                                    control={passwordForm.control}
                                    name="currentPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Current Password</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        type={showPassword.current ? 'text' : 'password'}
                                                        {...field}
                                                        className="pr-10"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setShowPassword((prev) => ({
                                                                ...prev,
                                                                current: !prev.current,
                                                            }))
                                                        }
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                                                    >
                                                        {showPassword.current ? <Eye /> : <EyeOff />}
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                <FormField
                                    control={passwordForm.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>New Password</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        type={showPassword.new ? 'text' : 'password'}
                                                        {...field}
                                                        className="pr-10"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setShowPassword((prev) => ({
                                                                ...prev,
                                                                new: !prev.new,
                                                            }))
                                                        }
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                                                    >
                                                        {showPassword.new ? <Eye /> : <EyeOff />}
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                <FormField
                                    control={passwordForm.control}
                                    name="rePassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        type={showPassword.confirm ? 'text' : 'password'}
                                                        {...field}
                                                        className="pr-10"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setShowPassword((prev) => ({
                                                                ...prev,
                                                                confirm: !prev.confirm,
                                                            }))
                                                        }
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                                                    >
                                                        {showPassword.confirm ? <Eye /> : <EyeOff />}
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                <Button
                                    type="submit"
                                    disabled={passwordForm.formState.isSubmitting}
                                    className="w-full bg-blue-500 hover:bg-blue-600"
                                >
                                    {passwordForm.formState.isSubmitting
                                        ? 'Updating...'
                                        : 'Update Password'}
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>

            {/* ================= Addresses ================= */}
            <div className="bg-white rounded-xl shadow-sm mt-4 overflow-hidden">
                <button
                    onClick={() =>
                        setOpenCard(openCard === 'address' ? null : 'address')
                    }
                    className="w-full flex justify-between items-center p-5 text-left"
                >
                    <span className="font-medium">Addresses</span>
                    <span
                        className={clsx(
                            'transition-transform duration-600',
                            openCard === 'address' && 'rotate-180'
                        )}
                    >
                        ▼
                    </span>
                </button>

                <div
                    className={clsx(
                        'transition-all duration-600 ease-in-out overflow-hidden',
                        openCard === 'address'
                            ? 'max-h-150 opacity-100'
                            : 'max-h-0 opacity-0'
                    )}
                >
                    <div className="p-5 pt-0 space-y-4">
                        {/* Saved Addresses */}
                        <div className="border rounded-lg divide-y">
                            {userAdresses?.data?.map((addr) => (
                                <div
                                    key={addr._id}
                                    className="flex justify-between items-center p-3"
                                >
                                    <div>
                                        <p className="font-medium">{addr.details}</p>
                                        <p className="text-sm text-slate-500">
                                            {addr.city}
                                        </p>
                                        <p className="text-sm text-slate-500">
                                            {addr.phone}
                                        </p>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => handleEditAddress(addr)}
                                            className="text-blue-500 cursor-pointer"
                                        >
                                            <Pencil size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteAddress(addr._id)}
                                            type="button"
                                            className="text-red-500 cursor-pointer"
                                        >
                                            <Trash size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Address Form */}
                        <Form {...addressForm}>
                            <form
                                onSubmit={addressForm.handleSubmit(submitAddress)}
                                className="space-y-4"
                            >
                                <FormField
                                    control={addressForm.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={addressForm.control}
                                    name="details"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Details</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={addressForm.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={addressForm.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>City</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button className="w-full bg-blue-500 hover:bg-blue-600">
                                    {editingAddressId ? 'Update Address' : 'Add Address'}
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>

        </div >
    )
}

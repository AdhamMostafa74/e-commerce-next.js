'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { resetPassword } from '@/services/auth'
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast'

import z from 'zod';


const rePasswordSchema = z.object({
    email: z.email(),
    newPassword: z.string().min(8, "Minimum 8 characters"),
});

export type rePasswordForm = z.infer<typeof rePasswordSchema>;

export default function PasswordReset() {

    const [showPassword, setShowPassword] = useState(false);

    const rePasswordForm = useForm<rePasswordForm>({
        resolver: zodResolver(rePasswordSchema),
        mode: "onChange",
    });
    const router = useRouter()

    const passwordReset = async (data: rePasswordForm) => {

        const response = await resetPassword(data);

        if (response?.token) {

            toast.success("Your password has been reset!");
            setTimeout(() => {
                router.push("/auth/login")
            }, 2000);
        } else {
            toast.error(response.message);
        }
    };


    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 p-12">
            <Card className="w-2xl max-w-2xl sm:max-w-md md:max-w-xl lg:max-w-2xl lg:p-8 shadow-md bg-slate-200 p-6">
                <CardHeader>
                    <CardTitle className="text-center text-2xl sm:text-3xl">
                        Reset password
                    </CardTitle>
                </CardHeader>

                <CardContent>

                    <Form {...rePasswordForm}>
                        <form
                            className="space-y-4"
                            onSubmit={rePasswordForm.handleSubmit(passwordReset)}
                        >
                            <FormField
                                control={rePasswordForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="sm:h-14"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={rePasswordForm.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <div className="relative  mb-4">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    {...field}
                                                    className='h-14 '
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground "
                                                >
                                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full h-10 sm:h-11 bg-blue-500 text-lg hover:bg-blue-600"
                                disabled={
                                    !rePasswordForm.formState.isValid ||
                                    rePasswordForm.formState.isSubmitting
                                }
                            >
                                Reset Password
                            </Button>
                        </form>
                    </Form>




                    <p className="mt-4 text-center text-sm text-gray-600">
                        Remembered your password?{" "}
                        <Link
                            href={"/auth/login"}
                            type="button"
                            className="font-medium text-blue-600 hover:underline"
                        >
                            Back to login
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

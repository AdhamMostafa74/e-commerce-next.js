"use client";

import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { RegisterFormData } from "./page";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "./schema";
import { createNewUser } from "@/services/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterForm({ callbackUrl }: { callbackUrl: string }) {

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null)
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        setLoading(true);

        // 🔗 API CALL
        const response = await createNewUser(data)
        setLoading(false);
        if (response?.message === 'success') {
            router.push(callbackUrl)
        } else {
            if (response.message) {
                setError(response.message)
            } else {
                setError(response?.errors.msg);

            }
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <Card className="w-full max-w-2xl p-8 bg-slate-200 shadow-md rounded-xl">
                <CardHeader>
                    <CardTitle className="text-center text-2xl sm:text-3xl">
                        Register
                    </CardTitle>
                </CardHeader>
                {error && (
                    <div className="mb-4 rounded-md bg-red-100 px-3 py-2 text-sm text-red-600">
                        {error}
                    </div>
                )}
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Name */}
                        <div className="space-y-1">
                            <Label>Name</Label>
                            <Input placeholder="Your Name" {...register("name")} />
                            {errors.name && (
                                <p className="text-sm text-red-500">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="space-y-1">
                            <Label>Email</Label>
                            <Input
                                type="email"
                                placeholder="you@example.com"
                                {...register("email")}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Phone */}
                        <div className="space-y-1">
                            <Label>Phone</Label>
                            <Input placeholder="01010700701" {...register("phone")} />
                            {errors.phone && (
                                <p className="text-sm text-red-500">{errors.phone.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-1">
                            <Label>Password</Label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password")}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-sm text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Re Password */}
                        <div className="space-y-1">
                            <Label>Confirm Password</Label>
                            <Input
                                type={showPassword ? "text" : "password"}
                                {...register("rePassword")}
                            />
                            {errors.rePassword && (
                                <p className="text-sm text-red-500">
                                    {errors.rePassword.message}
                                </p>
                            )}
                        </div>

                        {/* Button */}
                        <Button
                            type="submit"
                            disabled={loading}
                            className={`w-full mt-2 text-white transition-all ${loading
                                ? "bg-blue-500 cursor-not-allowed"
                                : "bg-blue-500 hover:bg-blue-600"
                                }`}
                        >
                            {loading ? "Creating account..." : "Register"}
                        </Button>

                        {/* Footer */}
                        <p className="text-center text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link href="/auth/login" className="text-blue-500 hover:underline">
                                Login
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

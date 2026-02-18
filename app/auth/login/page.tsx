"use client";

import { useState } from "react";
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";

import { loginSchema } from "@/app/auth/login/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useRouter, useSearchParams } from "next/navigation";
import { CgSpinner } from "react-icons/cg";
import ForgotPasswordPage from "./forgotPassword";
import Link from "next/link";

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const [serverError, setServerError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);


    const router = useRouter()
    const searchParams = useSearchParams();

    const rawCallbackUrl = searchParams.get("callbackUrl");

    const callbackUrl =
        rawCallbackUrl &&
            rawCallbackUrl.startsWith("/") &&
            !rawCallbackUrl.startsWith("/auth/login")
            ? rawCallbackUrl
            : "/home";



    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: LoginFormData) => {
        setServerError(null);


        try {
            // 🔌 IMPLEMENT LOGIN API HERE
            const response = await signIn(
                "credentials", {
                email: data.email,
                password: data.password,
                redirect: false
            }
            )
            if (response?.ok) {
                router.push(callbackUrl)
            } else {
                console.log("SIGN IN ERROR:", response?.error);
                setServerError("Incorrect email or password.");
            }
        } catch {
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 p-12">
            {showForgotPassword ? <ForgotPasswordPage onBack={() => setShowForgotPassword(false)} />
                : <Card className="w-full max-w-2xl sm:max-w-md md:max-w-xl lg:max-w-2xl lg:p-8 shadow-md bg-slate-200 p-6">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl sm:text-3xl">
                            Login
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        {serverError && (
                            <div className="mb-4 rounded-md bg-red-100 px-3 py-2 text-sm text-red-600">
                                {serverError}
                            </div>
                        )}

                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
                                {/* Email */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="you@example.com"
                                                    {...field}
                                                    className="sm:h-14 focus:border-gray-500"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Password */}
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="••••••••"
                                                        {...field}
                                                        className="sm:h-14 pe-10"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword((p) => !p)}
                                                        className="absolute pe-3 right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                        aria-label={
                                                            showPassword ? "Hide password" : "Show password"
                                                        }
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff className="h-5 w-5" />
                                                        ) : (
                                                            <Eye className="h-5 w-5" />
                                                        )}
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Forgot password */}
                                <div className="text-right">
                                    <button
                                        type="button"
                                        onClick={() => setShowForgotPassword(true)}
                                        className="text-sm text-blue-600 hover:underline"
                                    >
                                        Forgot password?
                                    </button>

                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-10 sm:h-11 bg-blue-500 text-lg hover:bg-blue-600"
                                    disabled={!form.formState.isValid || form.formState.isSubmitting}
                                >
                                    {form.formState.isSubmitting ? <div className="flex justify-center items-center gap-2">
                                        <CgSpinner className="animate-spin"></CgSpinner>
                                        <span> Signing in...</span>
                                    </div> : "Login"}
                                </Button>
                            </form>
                        </Form>

                        <p className="mt-4 text-center text-sm text-gray-600">
                            Don’t have an account?{" "}
                            <Link
                                href="/auth/register"
                                className="font-medium text-blue-600 hover:underline"
                            >
                                Register
                            </Link>
                        </p>
                    </CardContent>
                </Card>}
        </div>
    );
}

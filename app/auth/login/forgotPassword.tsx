"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

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
import { forgotPassword, verifyCode } from "@/services/auth";
import { useRouter } from "next/navigation";
import { CgSpinner } from "react-icons/cg";

const CODE_LENGTH = 6;

const emailSchema = z.object({
    email: z.email("Enter a valid email"),
});

const codeSchema = z.object({
    email: z.email(),
    resetCode: z.string().length(CODE_LENGTH, "Invalid code"),
});

export type EmailForm = z.infer<typeof emailSchema>;
export type CodeForm = z.infer<typeof codeSchema>;

export default function ForgotPasswordPage({
    onBack,
}: {
    onBack: () => void;
}) {
    const [step, setStep] = useState<"email" | "code">("email");
    const [cooldown, setCooldown] = useState(0);

    const emailForm = useForm<EmailForm>({
        resolver: zodResolver(emailSchema),
        mode: "onChange",
    });
    const router = useRouter()

    const codeForm = useForm<CodeForm>({
        resolver: zodResolver(codeSchema),
        mode: "onChange",
        defaultValues: { resetCode: "" },
    });

    useEffect(() => {
        if (cooldown <= 0) return;
        const i = setInterval(() => setCooldown((c) => c - 1), 1000);
        return () => clearInterval(i);
    }, [cooldown]);

    const onVerifyCode = async (data: CodeForm) => {

        const response = await verifyCode(data);

        if (response?.status == "Success") {
            router.push("/auth/passwordreset")
        } else {
            toast.error(response.message);
            toast.error('Incorrect Code!');
        }
    };

    const code = useWatch({
        control: codeForm.control,
        name: "resetCode",
    })

    useEffect(() => {
        if (code?.length === CODE_LENGTH) {
            codeForm.handleSubmit(onVerifyCode)();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [code]);


    const onSendCode = async (data: EmailForm) => {
        if (cooldown > 0) return;

        const response = await forgotPassword(data);

        if (response?.statusMsg == "success") {
            toast.success("Reset code sent to your email.");
            setStep("code");
            setCooldown(60);
            codeForm.setValue("email", data.email);
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
                    {step === "email" && (
                        <Form {...emailForm}>
                            <form
                                onSubmit={emailForm.handleSubmit(onSendCode)}
                                className="space-y-4"
                            >
                                <FormField
                                    control={emailForm.control}
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

                                <Button
                                    type="submit"
                                    className="w-full h-10 sm:h-11 bg-blue-500 text-lg hover:bg-blue-600"
                                    disabled={
                                        !emailForm.formState.isValid ||
                                        emailForm.formState.isSubmitting
                                    }
                                >
                                    Send reset link
                                </Button>
                            </form>
                        </Form>
                    )}

                    {step === "code" && (
                        <Form {...codeForm}
                        >

                            <form className="space-y-4"
                                onSubmit={codeForm.handleSubmit(onVerifyCode)}
                            >
                                <FormField
                                    control={codeForm.control}
                                    name="resetCode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Verification code
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    autoFocus
                                                    className="sm:h-14"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {!codeForm.formState.isSubmitting ? <Button className="w-full h-10 sm:h-11 bg-blue-500 text-lg hover:bg-blue-600"
                                >
                                    Submit Code
                                </Button>
                                    :
                                    <Button className="w-full h-10 sm:h-11 bg-blue-500 text-lg hover:bg-blue-600 disabled:bg-blue-300"
                                        disabled
                                    >
                                        <CgSpinner className="animate-spin" />
                                        Verifying...
                                    </Button>
                                }

                                <p className="text-sm text-center text-gray-600">
                                    Didn’t receive the code?{" "}
                                    {cooldown > 0 ? (
                                        <>Resend in {cooldown}s</>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                onSendCode(
                                                    emailForm.getValues()
                                                )
                                            }
                                            className="text-blue-600 hover:underline"
                                        >
                                            Resend
                                        </button>
                                    )}
                                </p>
                            </form>
                        </Form>
                    )}

                    {/* ✅ BACK TO LOGIN — SAME STYLE AS LOGIN PAGE */}
                    <p className="mt-4 text-center text-sm text-gray-600">
                        Remembered your password?{" "}
                        <button
                            type="button"
                            onClick={onBack}
                            className="font-medium text-blue-600 hover:underline"
                        >
                            Back to login
                        </button>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}

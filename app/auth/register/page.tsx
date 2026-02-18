'use client'
import { z } from "zod";

import { registerSchema } from "./schema";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import RegisterForm from "./RegisterForm";



export type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {

    const searchParams = useSearchParams();

    const rawCallbackUrl = searchParams.get("callbackUrl");

    const callbackUrl =
        rawCallbackUrl &&
            rawCallbackUrl.startsWith("/") &&
            !rawCallbackUrl.startsWith("/auth/register")
            ? rawCallbackUrl
            : "/auth/login";


    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RegisterForm callbackUrl={callbackUrl} />
        </Suspense>
    );

}

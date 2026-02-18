import { z } from "zod";

import { registerSchema } from "./schema";
import { Suspense } from "react";
import RegisterForm from "./RegisterForm";


type SearchParams = {
    callbackUrl?: string;
};

type Props = {
    searchParams: SearchParams;
};

export type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage({ searchParams }: Props) {
    const rawCallbackUrl = searchParams.callbackUrl

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

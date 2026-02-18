
import { Suspense } from "react";

import LoginPageContent from "./LoginPageContent";

export const dynamic = "force-dynamic";

type SearchParams = {
    callbackUrl?: string;
};

type Props = {
    searchParams: SearchParams;
};

export default function LoginForm({ searchParams }: Props) {
    const rawCallbackUrl = searchParams.callbackUrl;

    const callbackUrl =
        rawCallbackUrl &&
            rawCallbackUrl.startsWith("/") &&
            !rawCallbackUrl.startsWith("/auth/login")
            ? rawCallbackUrl
            : "/home";

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginPageContent callbackUrl={callbackUrl} />
        </Suspense>
    );
}




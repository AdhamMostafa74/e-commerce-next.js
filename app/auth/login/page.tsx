"use client";

import { useState } from "react";

import { useSearchParams } from "next/navigation";
import ForgotPasswordPage from "./forgotPassword";
import Login from "./login";

export const dynamic = "force-dynamic";



export default function LoginForm() {
    const [showForgotPassword, setShowForgotPassword] = useState(false);


    const searchParams = useSearchParams();

    const rawCallbackUrl = searchParams.get("callbackUrl");

    const callbackUrl =
        rawCallbackUrl &&
            rawCallbackUrl.startsWith("/") &&
            !rawCallbackUrl.startsWith("/auth/login")
            ? rawCallbackUrl
            : "/home";



    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 p-12">
            {showForgotPassword ? <ForgotPasswordPage onBack={() => setShowForgotPassword(false)} />
                : <Login
                    setShowForgotPassword={setShowForgotPassword}
                    callbackUrl={callbackUrl} />}
        </div>
    );
}

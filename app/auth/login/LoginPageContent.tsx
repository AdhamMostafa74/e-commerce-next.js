"use client";

import { useState } from "react";
import Login from "./login";
import ForgotPasswordPage from "./forgotPassword";

export default function LoginPageContent({ callbackUrl }: { callbackUrl: string }) {
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 p-12">
            {showForgotPassword ? <ForgotPasswordPage onBack={() => setShowForgotPassword(false)} />
                : <Login
                    setShowForgotPassword={setShowForgotPassword}
                    callbackUrl={callbackUrl} />}
        </div>
    );
}
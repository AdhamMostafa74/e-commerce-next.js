import { CodeForm, EmailForm } from "@/app/auth/login/forgotPassword";
import { rePasswordForm } from "@/app/auth/passwordreset/page";
import { RegisterFormData } from "@/app/auth/register/page";
import { baseUrl } from "@/hooks/api";

export async function login(email: string, password: string) {
    const res = await fetch(baseUrl + "auth/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    return data;
}


export async function createNewUser(formData: RegisterFormData) {
    const res = await fetch(baseUrl + "auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    const data = await res.json();

    return data;
}


export async function forgotPassword(email: EmailForm) {
    const res = await fetch(baseUrl + "auth/forgotPasswords", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(email),
    });

    const data = await res.json();

    return data;
}


export async function verifyCode(code: CodeForm) {
    const res = await fetch(baseUrl + "auth/verifyResetCode", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(code),
    });

    const data = await res.json();

    return data;
}

export async function resetPassword(passwordData: rePasswordForm) {
    const res = await fetch(baseUrl + "auth/resetPassword", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(passwordData),
    });

    const data = await res.json();

    return data;
}


export async function verifyUser(token: string) {

    const res = await fetch(baseUrl + 'auth/verifyToken', {
        headers: {
            token: token
        }
    })
    if (!res.ok) {
        throw new Error("An error occurred!")
    }
    return res.json()

}
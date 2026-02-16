import { EmailForm } from "@/app/auth/login/forgotPassword";
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

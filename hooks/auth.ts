import { baseUrl } from "./api";

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



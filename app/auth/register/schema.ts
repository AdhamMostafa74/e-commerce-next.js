import { z } from "zod";


export const registerSchema = z
    .object({
        name: z.string().min(2, "Name is required"),
        email: z.email("Invalid email"),
        password: z.string().min(8, "Minimum 8 characters"),
        rePassword: z.string().min(8),
        phone: z.string().min(10, "Invalid phone number"),
    })
    .refine((data) => data.password === data.rePassword, {
        message: "Passwords do not match",
        path: ["rePassword"],
    });
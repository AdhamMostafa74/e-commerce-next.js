import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "./api";
import { signOut, useSession } from "next-auth/react";
import { PasswordForm, PersonalDataForm } from "@/app/(pages)/profile/[userId]/changeData";
import toast from "react-hot-toast";


export function useChangeInfo() {

    const { data } = useSession()
    const query = useMutation({
        mutationFn: async (userData: PersonalDataForm) => {
            const res = await fetch(baseUrl + "users/updateMe/", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    token: data!.accessToken
                },
                body: JSON.stringify(userData)
            })

            if (!res.ok) {
                throw new Error("Cannot change information!")
            }

            return res.json()
        },
        onSuccess: () => {
            toast.success('Profile updated successfully')
        },
        onError: () => {
            toast.error('Cannot change information!')
        }
    })

    return query
}
export function useChangePassword() {
    const { data } = useSession()
    const query = useMutation({
        mutationFn: async (userData: PasswordForm) => {
            const res = await fetch(baseUrl + "users/changeMyPassword", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    token: data!.accessToken
                },
                body: JSON.stringify(userData)
            })

            if (!res.ok) {
                throw new Error("Cannot change information!")
            }

            return res.json()
        },
        onSuccess: () => {
            signOut()
            toast.success("PASSWORD CHANGED! PLEASE LOGIN AGAIN TO PROCEED!")
        }
    })

    return query
}

"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { loginAction } from "../_actions/authAction"
import { useActionState, } from "react"
import { useForm } from "react-hook-form"
import { LoginFormData, loginSchema } from "@/lib/validations/auth.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"

const LoginForm = () => {

    const [state, formAction, isPending] = useActionState(loginAction, {
        success: false,
        message: ""
    })// returned thing by loginAction will be stored in state so that we can use this later. when the loginAction will be running the isPending will be true.

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = (data: LoginFormData) => {
        const formData = new FormData();

        formData.append("email", data.email);
        formData.append("password", data.password);

        formAction(formData);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
        >
            <Card className="p-5 space-y-4">
                <Input
                    {...register("email")}
                    type="email"
                    placeholder="Enter your email"
                />
                {errors.email && (
                    <p className="text-sm text-red-500">
                        {errors.email.message}
                    </p>
                )}

                <Input
                    {...register("password")}
                    type="password"
                    placeholder="Enter your password"
                />
                {errors.password && (
                    <p className="text-sm text-red-500">
                        {errors.password.message}
                    </p>
                )}
                <Button type="submit" disabled={isPending}>
                    {isPending ? "Logging in..." : "Login"}
                </Button>

                <p>
                    Do not have an account? <Link href="/register" className="text-primary hover:underline">Register</Link>
                </p>

                {state.message && (
                    <p
                        className={
                            state.success
                                ? "text-green-500"
                                : "text-red-500"
                        }
                    >
                        {state.message}
                    </p>
                )}

            </Card>
        </form>
    )
}

export default LoginForm
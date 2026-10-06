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

    // form input field's registered values will be be set in data object
    const onSubmit = (data: LoginFormData) => {
        const formData = new FormData(); // creating a empty FormData object

        formData.append("userEmail", data.email);
        formData.append("userPassword", data.password);

        formAction(formData);
    };

    const handleAdminDemoLogin = () => {
        const formData = new FormData();

        formData.append("userEmail", "michael@gmail.com");
        formData.append("userPassword", "123456");

        formAction(formData);
    };

    const handleCustomerLogin = () => {
        const formData = new FormData();

        formData.append("userEmail", "customer@gmail.com");
        formData.append("userPassword", "123456");

        formAction(formData);
    };

    const handleTechnicianLogin = () => {
        const formData = new FormData();

        formData.append("userEmail", "technician@gmail.com");
        formData.append("userPassword", "123456");

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
                    {isPending ? "Logging in..." : " Login"}
                </Button>

                {/* Admin button */}
                <Button type="button" className="bg-purple-700" disabled={isPending} onClick={handleAdminDemoLogin}>
                    {isPending ? "Logging in..." : "Login as Admin"}
                </Button>

                {/* Customer Button */}
                <Button type="button" className="bg-blue-700" disabled={isPending} onClick={handleCustomerLogin}>
                    {isPending ? "Logging in..." : "Login as Customer"}
                </Button>

                {/* Technician Button */}
                <Button type="button" className="bg-green-700" disabled={isPending} onClick={handleTechnicianLogin}>
                    {isPending ? "Logging in..." : "Login as Technician"}
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
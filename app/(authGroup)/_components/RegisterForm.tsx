'use client'
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { registerAction } from "../_actions/authAction";
import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormData, registerSchema } from "@/lib/validations/auth.schema";
import Link from "next/link";


const RegisterForm = () => {

    const [state, formAction, isPending] = useActionState(registerAction, {
        success: false,
        message: ""
    }) // things returned by registerAction will be stored in state so that we can use this later. when the registerAction will be running the isPending will be true.

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = (data: RegisterFormData) => {
        const formData = new FormData();

        formData.append("name", data.name);
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
                <b>Name</b>
                <Input
                    {...register("name")}
                    type="text"
                    placeholder="Enter your name"
                />
                {errors.name && (
                    <p className="text-sm text-red-500">
                        {errors.name.message}
                    </p>
                )}
                <b>Email</b>
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
                <b>Password</b>
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

                <Button>
                    {isPending ? "Creating Account..." : "Register"}
                </Button>

                <p className={state.success ? "text-green-500" : "text-red-600"}>
                    {state.message}
                </p>
                <p>
                    Already have an account? <Link href="/login" className="text-primary hover:underline">Login</Link>
                </p>
            </Card>
        </form>
    )
}

export default RegisterForm
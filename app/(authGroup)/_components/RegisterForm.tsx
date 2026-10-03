'use client'
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { loginAction, registerAction } from "../_actions/authAction";
import { useActionState } from "react";

const RegisterForm = () => {

    const [state, formAction, isPending] = useActionState(registerAction, {
        success: false,
        message: ""
    }) // things returned by registerAction will be stored in state so that we can use this later. when the registerAction will be running the isPending will be true.
    return (

        <form action={formAction} className="space-y-4">
            <Card className="p-5 space-y-4">
                <b>Name</b>
                <Input name="name" type="text" placeholder="Enter your name" required />
                <b>Email</b>
                <Input name="email" type="email" placeholder="Enter your email" required />
                <b>Password</b>
                <Input name="password" type="password" placeholder="Enter your password" required />

                <Button>
                    {isPending ? "Creating Account..." : "Register"}
                </Button>

                <p className={state.success ? "text-green-500" : "text-red-600"}>
                    {state.message}
                </p>
            </Card>
        </form>
    )
}

export default RegisterForm
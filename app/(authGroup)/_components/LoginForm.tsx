"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { loginAction } from "../_actions/authAction"
import { useActionState, } from "react"

const LoginForm = () => {

    const [state, formAction, isPending] = useActionState(loginAction, {
        success: false,
        message: ""
    })// returned thing by loginAction will be stored in state so that we can use this later. when the loginAction will be running the isPending will be true.

    return (
        <form action={formAction} className="space-y-4">
            <Card className="p-5 space-y-4">
                <Input name="email" type="email" placeholder="Enter your email" required />
                <Input name="password" type="password" placeholder="Enter your password" required />
                <Button type="submit" disabled={isPending}>
                    {isPending ? "Logging in..." : "Login"}
                </Button>

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
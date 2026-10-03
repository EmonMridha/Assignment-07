'use server'

export const loginAction = async (state: { success: boolean, message: string }, formData: FormData) => {

    const email = formData.get('email');
    const password = formData.get('password')

    const payload = {
        email,
        password
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const result = await res.json();

    if (!res.ok) {
        return {
            success: false,
            message: result.message || 'Login failed'
        };
    }

    return {
        success: true,
        message: result.message || "Login successful"
    }
}

export const registerAction = async (state: { success: boolean, message: string }, formData: FormData) => {

    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password')

    const payload = {
        name,
        email,
        password
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/v1/auth/register`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })

    const result = await res.json();

    if (!res.ok) {
        return {
            success: false,
            message: result.message || 'Registration failed'
        };
    }

    return {
        success: true,
        message: result.message || "Registration successful"
    }
}

import RegisterForm from '../_components/RegisterForm'

const RegisterPage = () => {
    return (
        <div className='flex min-h-screen items-center justify-center'>
            <div className='w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg'>

                <div className='space-y-2 text-center'>
                    <h1 className='text-3xl font-bold'>
                        Welcome Back to <br /><p className='text-amber-300'> PowerWatch</p>
                    </h1>
                    <p className='text-gray-100'><b>REGISTER</b> with your credentials</p>
                    <RegisterForm />
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
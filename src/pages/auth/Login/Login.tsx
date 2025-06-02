import { Input } from "@/componets/Inputs/Input"
import { useLogin } from '@/pages/auth/hooks/useLogin'

export const Login = () => {
    const {
        formRef,
        emailRef,
        passwordRef,
        disabledBtn,
        handleFormOnChange,
        submit
    } = useLogin()
    return (
        <form
            onChange={handleFormOnChange}
            onSubmit={submit}
            ref={formRef}
            className="relative flex flex-col justify-around items-center peer"
            autoComplete="off"
            noValidate
            data-testid="login form"
        >
            <div>
                <Input
                    ref={emailRef}
                    type="email"
                    id="email"
                    name="email"
                    className='invalid:border-red-500! peer'
                    placeholder="Enter your Email"
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    autoComplete="off"
                    label='Email'
                    message='Invalid Email'
                    data-testid="email"
                />
            </div>
            <div>
                <Input
                    ref={passwordRef}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    minLength={8}
                    pattern=".{8,}"
                    label='Password'
                    message='Short password'
                    data-testid="password"
                    required
                />
            </div>
            <button data-testid="submit" type="submit" disabled={disabledBtn}>LogIn</button>
        </form>
    )
}
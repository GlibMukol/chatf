import { Input } from "@/componets/Inputs/Input"
import { useLogin } from '@/pages/auth/hooks/useLogin'
import { LuEye, LuEyeClosed } from "react-icons/lu";

export const Login = () => {
    const {
        formRef,
        emailRef,
        passwordRef,
        disabledBtn,
        handleFormOnChange,
        showPwd,
        handleShowPwd,
        submit
    } = useLogin()
    return (
        <form
            onSubmit={submit}
            onChange={handleFormOnChange}
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
            <div className="relative">
                <Input
                    ref={passwordRef}
                    type={showPwd ? "text" : "password"}
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
                <span
                    data-testid="toogle"
                    onClick={handleShowPwd}
                    className="absolute right-2 top-8 cursor-pointer"
                >
                    {showPwd ? <LuEyeClosed data-testid="lueeyeclosed" /> : <LuEye data-testid="lueye" />}
                </span>
            </div>
            <button data-testid="submit" type="submit" disabled={disabledBtn}>LogIn</button>
        </form>
    )
}
import { Input } from "@/componets/Inputs/Input"

export const Login = () => {
    return (
        <form className="relative flex flex-col justify-around items-center" autoComplete="off">
            <div>
                <Input
                    type="email"
                    id="email"
                    className='invalid:border-red-500! peer'
                    placeholder="Enter your Email"
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    autoComplete="off"
                    label='Email'
                    message='Invalid Email'
                />
            </div>

            <div>
                <Input
                    type="password"
                    placeholder="Enter your password"
                    minLength={8}
                    label='Password'
                    message='Short password'
                />
            </div>
            <button type="submit">LogIn</button>
        </form>
    )
}
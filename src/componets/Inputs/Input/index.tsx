import type { InputHTMLAttributes } from "react"

type TInput = InputHTMLAttributes<HTMLInputElement> & {
    label?: string
    message?: string
}

export const Input = (inputProps: TInput) => {
    return (
        <>
            {inputProps?.label && <label htmlFor={inputProps.id}>{inputProps.label}</label>}
            <input
                {...inputProps}
                className='invalid:border-red-500! peer'
            />
            {inputProps?.message && <p className='invisible text-red-500 text-sm peer-focus:invisible peer-invalid:visible transition delay-300 duration-3'>{inputProps.message}</p>}
        </>
    )
}
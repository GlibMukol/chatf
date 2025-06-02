import { useRef, useState, type FormEvent } from "react";
import { validLoginForm } from "../helpers";

export const useLogin = () => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const inputSet = [emailRef, passwordRef]
    const [disabledBtn, setDisabledButton] = useState(() => {
        return !validLoginForm(inputSet)
    });
    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        //TODO need create api for it
        // console.log('formData', e)
    }
    const handleFormOnChange = () => setDisabledButton(!validLoginForm(inputSet))
    return {
        formRef,
        emailRef,
        passwordRef,
        disabledBtn,
        handleFormOnChange,
        submit
    }
}
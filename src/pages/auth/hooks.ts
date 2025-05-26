import { useRef, useState, type FormEvent } from "react";
import { validLoginForm } from "./helpers";

export const useLogin = () => {
    const formRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const inputSet = [emailRef, passwordRef]
    const [disabledBtn, setDisabledButton] = useState(() => {
        return validLoginForm(inputSet)
    });
    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        //TODO
        console.log('formData', e)
    }
    const handleFormOnChange = () => setDisabledButton(validLoginForm(inputSet))
    return {
        formRef,
        emailRef,
        passwordRef,
        disabledBtn,
        handleFormOnChange,
        submit
    }
}
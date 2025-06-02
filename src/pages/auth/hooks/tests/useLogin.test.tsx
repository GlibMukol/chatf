import { render, renderHook, type RenderHookResult } from "@testing-library/react";
import { it, describe, expect, beforeEach, afterEach, vi } from "vitest";
import { Login } from "@/pages/auth/Login/Login"
import { useLogin } from "@/pages/auth/hooks/useLogin";
import '@testing-library/jest-dom/vitest'

describe("useLogin hook", () => {
    let hook: RenderHookResult<ReturnType<typeof useLogin>, unknown>;

    beforeEach(() => {
        hook = renderHook(() => useLogin());
    });

    afterEach(vi.clearAllMocks);

    it("should return all props", () => {
        const keys = ['formRef', "emailRef", "passwordRef", "disabledBtn", "handleFormOnChange", "submit"];
        const { result } = hook;
        expect(keys.every(key => key in result.current)).toBe(true);
    });

    it("should return currect interface", () => {
        const { result } = hook;
        const refStab = { current: null }
        expect(result.current).toEqual(
            expect.objectContaining({
                formRef: expect.objectContaining(refStab),
                emailRef: expect.objectContaining(refStab),
                passwordRef: expect.objectContaining(refStab),
                disabledBtn: expect.any(Boolean),
                handleFormOnChange: expect.any(Function),
                submit: expect.any(Function)
            })
        )
    });

    it("should submit be disabled when init", () => {
        const { result } = hook;
        console.log('result.current', result.current)
        expect(result.current.disabledBtn).toBe(true)
    });

    it("should submit be dissabled when password no valid", () => {
        const { result } = hook;
        result.current.emailRef = {
            current: {
                validity: {
                    valid: true
                }
            } as HTMLInputElement
        };
        expect(result.current.disabledBtn).toEqual(true);
    })
})
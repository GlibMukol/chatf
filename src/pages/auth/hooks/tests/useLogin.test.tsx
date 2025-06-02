import { renderHook, type RenderHookResult, act } from "@testing-library/react";
import { it, describe, expect, beforeEach, afterEach, vi } from "vitest";
import { useLogin } from "@/pages/auth/hooks/useLogin";
import '@testing-library/jest-dom/vitest'


const createMockINput = (isValid: boolean): HTMLInputElement => ({
    validity: {
        valid: isValid
    }
}) as unknown as HTMLInputElement;

describe("useLogin hook", () => {
    let hook: RenderHookResult<ReturnType<typeof useLogin>, unknown>;

    beforeEach(() => {
        hook = renderHook(() => useLogin());
    });

    afterEach(vi.clearAllMocks);

    it("should return all props", () => {
        const keys = ['formRef', "emailRef", "passwordRef", "handleFormOnChange", "disabledBtn", "showPwd", "submit"];
        const { result } = hook;
        expect(keys.every(key => key in result.current)).toBe(true);
    });

    it("should return currect interface", () => {
        const { result } = hook;
        const refStab = { current: null };
        expect(result.current).toEqual(
            expect.objectContaining({
                formRef: expect.objectContaining(refStab),
                emailRef: expect.objectContaining(refStab),
                passwordRef: expect.objectContaining(refStab),
                disabledBtn: expect.any(Boolean),
                submit: expect.any(Function),
                showPwd: expect.any(Boolean),
                handleShowPwd: expect.any(Function),
                handleFormOnChange: expect.any(Function)
            })
        )
    });

    it("should submit be disabled when init", () => {
        const { result } = hook;
        expect(result.current.disabledBtn).toBe(true);
    });

    it.each([
        [true, false, true],
        [false, true, true],
        [true, true, false]
    ])(
        'if email volid %s and password valid %s should by disabbled %s',
        (email, password, isValid) => {
            const { result } = hook;
            act(() => {
                result.current.emailRef.current = createMockINput(email);
                result.current.handleFormOnChange();
                result.current.passwordRef.current = createMockINput(password);
                result.current.handleFormOnChange();
            });

            act(() => {
                expect(result.current.disabledBtn).toEqual(isValid);
            });
        }
    );
})
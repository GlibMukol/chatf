import { renderHook, type RenderHookResult } from "@testing-library/react";
import { it, describe, expect, beforeEach, afterEach, vi } from "vitest";
import { useLogin } from "@/pages/auth/hooks/useLogin";

describe("useLogin hook", () => {
    let hook: RenderHookResult<ReturnType<typeof useLogin>, unknown>;

    beforeEach(() => {
        hook = renderHook(() => useLogin());
    });

    afterEach(vi.clearAllMocks);

    it("should return all props", () => {
        const keys = ['formRef', "emailRef", "passwordRef", "disabledBtn", "handleFormOnChange", "submit"];
        const { result } = hook;
        console.log('result.current', result.current)
        expect(keys.every(key => key in result.current)).toBe(true);
    });
})
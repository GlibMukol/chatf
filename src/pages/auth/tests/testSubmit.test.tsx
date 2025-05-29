import { render, screen } from "@testing-library/react";
import { Login } from "@/pages/auth/Login"
import { describe, expect, it, beforeEach, vi, afterAll, } from "vitest";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event"

const mockSubmit = vi.fn((e) => e.preventDefault());
const mockHandleFormOnChange = vi.fn();
const mockFormRef = { current: null };
const mockEmailRef = { current: null };
const mockPasswordRef = { current: null };

describe('Check if use submit from hook', () => {
    beforeEach(() => {
        vi.mock("../hooks/useLogin", () => ({
            useLogin: () => ({
                formRef: mockFormRef,
                emailRef: mockEmailRef,
                passwordRef: mockPasswordRef,
                disabledBtn: true,
                handleFormOnChange: mockHandleFormOnChange,
                submit: mockSubmit,
            })
        }));
    });

    afterAll(vi.clearAllMocks)

    it("shoul use function from hook", async () => {
        const user = userEvent.setup();
        render(<Login />);

        const emailInput = screen.getByTestId('email');
        const passwordInput = screen.getByTestId('password');
        const submitButton = screen.getByTestId('submit');

        await user.type(emailInput, 'test@example.com');
        await user.type(passwordInput, 'password123');

        expect(submitButton).toBeEnabled();

        await user.click(submitButton);

        expect(mockSubmit).toHaveBeenCalledTimes(1);
    });

})

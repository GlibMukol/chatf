import { render, screen } from "@testing-library/react";
import { Login } from "@/pages/auth/Login/Login"
import { describe, expect, it, beforeEach, vi, afterAll, } from "vitest";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event"

const mockSubmit = vi.fn((e) => e.preventDefault());

describe('Check if use submit from hook', () => {
    beforeEach(() => {
        vi.mock("../../hooks/useLogin", () => ({
            useLogin: () => ({
                disabledBtn: true,
                submit: mockSubmit,
            })
        }));
    });

    afterAll(vi.clearAllMocks)

    it("should use function from hook", async () => {
        const user = userEvent.setup();
        render(<Login />);
        const submitButton = screen.getByTestId('submit') as HTMLButtonElement;
        submitButton.disabled = false
        await user.click(submitButton);
        expect(mockSubmit).toHaveBeenCalled();


    });

})

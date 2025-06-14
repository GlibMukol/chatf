import { render, screen } from "@testing-library/react";
import { Login } from "@/pages/auth/Login/Login"
import { describe, expect, it, beforeEach, vi, afterEach, } from "vitest";
import "@testing-library/jest-dom/vitest";
import userEvent, { type UserEvent } from "@testing-library/user-event"
import { type RefObject } from "react";
import { validLoginForm } from "@/pages/auth/helpers";


const returnValidityStub = (valid = true, isNull = false) => {
    return (isNull ? null : {
        current: {
            validity: {
                valid
            }
        }
    }) as unknown as RefObject<HTMLInputElement | null>
}

describe("Helper functions", () => {
    describe("Test for validLoginForm function", () => {
        let emailMock: RefObject<HTMLInputElement | null>;
        let passworMock: RefObject<HTMLInputElement | null>;

        beforeEach(() => {
            [emailMock, passworMock] = Array.from({ length: 2 }, () => returnValidityStub())
            emailMock = returnValidityStub();
            passworMock = returnValidityStub();
        });

        it("should be invalid if ref are null", () => {
            [emailMock, passworMock] = Array.from({ length: 2 }, () => returnValidityStub(true, true));
            const actual = validLoginForm([emailMock, passworMock]);
            expect(actual).toBeFalsy()
        })

        it("should return ivalid with invalid email login form", () => {
            emailMock = returnValidityStub(false);
            const actual = validLoginForm([emailMock, passworMock]);
            expect(actual).toBeFalsy()
        });

        it("should invalid if password invalid", () => {
            passworMock = returnValidityStub(false);
            const actual = validLoginForm([emailMock, passworMock]);
            expect(actual).toBeFalsy()

        });

        it("sholt return true if inputs are valid", () => {
            const actual = validLoginForm([emailMock, passworMock]);
            expect(actual).toBeTruthy()
        })
    })
})



describe("Login Component", () => {
    let e: UserEvent
    beforeEach(async () => {
        render(<Login />)
        e = userEvent.setup();

    })
    it("should render the login form", () => {
        const form = screen.getByTestId("login form");
        expect(form).toBeInTheDocument();
    });



    describe("check email input", () => {
        let emailInput: HTMLInputElement;
        beforeEach(async () => {
            emailInput = screen.getByTestId("email");
            await e.clear(emailInput)
        })
        it("should be defined email input", () => {
            expect(emailInput).toBeInTheDocument();
            expect(emailInput).toHaveAttribute("pattern", "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$")
        });

        it("should set error when email is invalid", async () => {
            await e.type(emailInput, "test");
            expect(emailInput).not.toBeValid()
        });

        it("should show error message", async () => {
            await e.type(emailInput, "test");
            const emailErrorMessage = screen.getByText(/Invalid Email/i);
            expect(emailErrorMessage).toBeInTheDocument()
        });

        it("should be valid when email input valid", async () => {
            await e.type(emailInput, "test@test.com");
            expect(emailInput).toBeValid();
        });
    });



    describe("test password input", () => {
        let passwordInput: HTMLInputElement;
        beforeEach(async () => {
            passwordInput = screen.getByTestId("password");
            await e.clear(passwordInput);
        });

        it("should exist in screen", () => {
            expect(passwordInput).toBeInTheDocument()
        });

        it("should be invalid if length less eight", async () => {
            await e.type(passwordInput, "1230");
            expect(passwordInput).not.toBeValid();
        });

        it("should be error massage if not valid", async () => {
            await e.type(passwordInput, "1230");
            const passwordErrorMessage = screen.getByText(/Short password/i);
            expect(passwordErrorMessage).toBeInTheDocument()
        })

        it("should be valid with correct length", async () => {
            await e.type(passwordInput, '12345678');
            expect(passwordInput).toBeValid()
        });


        it("should be type password when init", () => {
            expect(passwordInput.type).toEqual("password")
        });

        it("should be show password icon be n document", () => {
            const showPwd = screen.getByTestId("lueye");
            expect(showPwd).toBeInTheDocument();
        });

        it("should change input type by icon click", async () => {
            const toogleIcon = screen.getByTestId("toogle");
            await e.click(toogleIcon);
            expect(passwordInput.type).toEqual("text")
        });

        it("should hide password icon be in document when toogle clicked", async () => {
            const toogleIcon = screen.getByTestId("toogle");
            await e.click(toogleIcon);
            const hidePwd = screen.getByTestId("lueeyeclosed");
            expect(hidePwd).toBeInTheDocument();
        });

    });

    describe("submit button tests", () => {
        let submitButton: HTMLButtonElement;
        beforeEach(() => {
            submitButton = screen.getByTestId("submit");
        });

        afterEach(vi.clearAllMocks)

        it("should be disabled if email not valid", async () => {
            const emailInput = screen.getByTestId('email');
            await e.clear(emailInput);
            await e.type(emailInput, "test");
            expect(submitButton).toBeDisabled();
        });

        it("should be disabled if passwor not valid", async () => {
            const passwordElement = screen.getByTestId("password");
            await e.clear(passwordElement);
            await e.type(passwordElement, "123");
            expect(submitButton).toBeDisabled();
        });

        it("should be enabled if input are valid", async () => {
            const [emailElement, passwordElement] = ['email', "password"].map(item => screen.getByTestId(item));
            await e.clear(emailElement);
            await e.clear(passwordElement);

            await e.type(emailElement, "test@test.com");
            await e.type(passwordElement, "q1231231231");

            expect(submitButton).toBeEnabled()
        });
    });



});




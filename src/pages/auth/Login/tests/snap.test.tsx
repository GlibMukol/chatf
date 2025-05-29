import { render } from "@testing-library/react";
import { Login } from "@/pages/auth/Login/Login";
import { describe, it, expect } from "vitest"


describe("Login snapshots", () => {
    it("should correct render", () => {
        const { container } = render(<Login />);
        expect(container.firstChild).toMatchSnapshot();
    })
})

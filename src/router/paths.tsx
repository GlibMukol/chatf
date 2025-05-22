import type React from "react"

import { AuthContainer } from "@pages/auth"

type TPath = {
    path: string,
    component: React.FC
}

export const Paths: TPath[] = [
    {
        path: '/',
        component: AuthContainer
    }
]
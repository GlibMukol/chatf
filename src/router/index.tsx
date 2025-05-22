import { BrowserRouter, Route, Routes } from "react-router"
import { Paths } from "@/router/paths"

export const Routers = () => {

    return (
        <BrowserRouter>
            <Routes>
                {Paths.map((item) => <Route path={item.path} element={<item.component />} />)}
            </Routes>
        </BrowserRouter>
    )
}

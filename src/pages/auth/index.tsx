import { Card } from "@/componets/Card"
import { PageContainer } from "@/componets/PageContainer"
import { Login } from "./Login/Login"

export const AuthContainer = () => {
    return (
        <PageContainer>
            <Card>
                <Login />
            </Card>
        </PageContainer>
    )
}


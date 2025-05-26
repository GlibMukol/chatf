import type React from "react";


type TPageContainer = {
    children: React.ReactNode;
}

export const PageContainer: React.FC<TPageContainer> = ({ children }) => (
    <div className="relative w-full flex flex-col items-center justify-center h-dvh">
        {children}
    </div>
)

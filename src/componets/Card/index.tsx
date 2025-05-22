import type React from "react";
import style from './style.module.css'

type TCard = {
    children: React.ReactNode,
    readonly sizes?: {
        width?: string,
        height?: string
    }
}

export const Card: React.FC<TCard> = ({ children, sizes }) => {
    const combinedStyles = `${style.card} ${sizes?.width || ""} ${sizes?.height || ""}`
    return (
        <div className={combinedStyles}>
            {children}
        </div>
    )
}
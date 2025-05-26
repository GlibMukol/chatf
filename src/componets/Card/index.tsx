import type React from "react";
import clsx from "clsx";

type TCard = {
    children: React.ReactNode,
    readonly sizes?: {
        width?: string,
        height?: string
    }
}

const defaultCardCss = "relative flex flex-col justify-center items-center p-2 gap-1 rounded-md shadow-md"
export const Card: React.FC<TCard> = ({ children, sizes }) => (
    <div className={clsx(defaultCardCss, sizes?.width, sizes?.height)}>
        {children}
    </div>
);

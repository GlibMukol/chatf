import type React from "react";
import styles from "./style.module.css";


type TPageContainer = {
    children: React.ReactNode;
}

export const PageContainer: React.FC<TPageContainer> = ({ children }) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}
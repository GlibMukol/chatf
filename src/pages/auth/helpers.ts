import type { RefObject } from "react";

export const validLoginForm = (inputRefs: RefObject<HTMLInputElement | null>[]) =>
    inputRefs.map((item) =>
        item !== null && item.current ? (item?.current as HTMLInputElement).validity.valid : false)
        .filter(item => item === false)
        .length === 0 
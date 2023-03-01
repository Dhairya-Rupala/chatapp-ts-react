import { RefObject } from "react"

export type MessageProps = {
    content: string,
    from: {
        id: string | null ,
        name:string | null,
    },
    messageRef: RefObject<HTMLDivElement> | null,
    isLast:boolean
}
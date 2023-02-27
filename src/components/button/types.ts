import React from "react"


export type ButtonProps = {
    children: React.ReactNode,
    onClick: (e:React.MouseEvent)=>void,
    disabled?: boolean,
    overrides?: {
        [property:string]:string
    }
}
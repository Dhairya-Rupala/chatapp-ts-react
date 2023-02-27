import React from "react";

// export type LayoutProps = {
//     top: JSX.Element,
//     left: JSX.Element,
//     right:JSX.Element
// }

export const SLOT_NAMES = {
    HEADER: "header",
    LEFT_PANEL: "leftPanel",
    RIGHT_PANEL: "rightPanel"
} as const;


export interface SlotProps{
    name: string,
    children?:React.ReactNode
}

export interface LayoutProps{
    children:React.ReactElement | (React.ReactElement)[]
}


export const Slot = (props: SlotProps) => null;
type SlotType = typeof Slot;

export type LayoutType = ((props: LayoutProps) => JSX.Element) & {
    Slot:SlotType
}

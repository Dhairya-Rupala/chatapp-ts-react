import {ReactNode,ReactElement} from "react";


export const SLOT_NAMES = {
    HEADER: "header",
    LEFT_PANEL: "leftPanel",
    RIGHT_PANEL: "rightPanel"
} as const;


export interface SlotProps{
    name: string,
    children?:ReactNode
}

export interface LayoutProps{
    children:ReactElement | (ReactElement)[]
}

export const Slot = (props: SlotProps) => null;
type SlotType = typeof Slot;


export type LayoutType = ((props: LayoutProps) => ReactElement) & {
    Slot:SlotType
}

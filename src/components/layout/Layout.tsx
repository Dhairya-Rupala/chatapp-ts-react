// libs 
import React from "react";
// styles
import styles from "./Layout.module.css";
// types
import { SLOT_NAMES,Slot,LayoutType,LayoutProps } from "./types";


const Layout:LayoutType = ({ children }: LayoutProps) => {
  const Slots : {
    [slot:string]:JSX.Element
  } = {}
  
  React.Children.forEach(children, (child: React.ReactElement) => {
    Slots[child?.props?.name] = child?.props?.children
  })

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>{Slots[SLOT_NAMES.HEADER]}</div>
      <div className={styles.body}>
        <div className={styles.leftPanel}>{Slots[SLOT_NAMES.LEFT_PANEL]}</div>
        <div className={styles.rightPanel}>{Slots[SLOT_NAMES.RIGHT_PANEL]}</div>
      </div>
    </div>
  )
}

Layout.Slot=Slot

export {Layout}




// // libs
// import { ChangeEvent, useCallback, useState } from "react";
// // components 
// import { Button } from "../../../button";
// // styles
// import styles from "./AddUserModal.module.css";
// // types
// import { AddUserModalProps } from "./types";
// import {ADD_NEW_USER_CHAT} from './actionTypes'


// const BUTTON_OVERRIDES = {
//   height: "40px",
//   width:"60px"
// }

// export const AddUserModal = ({ isOpen,  updateVisibility, onAction }: AddUserModalProps) => {
//   const [userName, setUserName] = useState("");

//   //TODO: toggleVisibility as a prop
//   //Never pass setState as prop
//   const toggleVisibility = useCallback(() => {
//     setIsModalOpen(!isModalOpen);
//   }, [isModalOpen, setIsModalOpen])
  
//   const handleUserNameChange = useCallback((e:ChangeEvent<HTMLInputElement>) => {
//     setUserName(e.target.value);
//   }, [])
  
//   const handleAddClick = useCallback(() => {
//     onAction({
//                 type: ADD_NEW_USER_CHAT,
//                 payload: {
//                   username:userName,
//                 },
//               });
//               updateVisibility();
//   },[onAction, updateVisibility, userName])

//   //ModalContainer to always render and load ModalBody content only when Modal is visible
//   return (
//     isOpen?
//     <>
//       <div
//         className={styles.overlay}
//         onClick={updateVisibility}
//           ></div>

//       <div className={styles.modalBody}>
//         <div className={styles.fieldWrapper}>
//           <span className={styles.label}>Username</span>
//                   <input
//                       className={styles.inputField}
//             type="text"
//             placeholder="Enter the username"
//             onChange={handleUserNameChange}
//           />
//         </div>
//         <div className={styles.buttonGroup}>
//           <Button
//             disabled={!userName}
//             onClick={handleAddClick}
//             overrides={BUTTON_OVERRIDES}
//           >
//             Add
//           </Button>
//           <Button onClick={updateVisibility} overrides={BUTTON_OVERRIDES}>Close</Button>
//         </div>
//       </div>
//     </>:null
//   );
// };

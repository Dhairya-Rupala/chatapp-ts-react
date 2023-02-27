// libs 
import { useEffect } from "react";

// components 
import { Layout } from "../../components/layout";
import { ChatList } from "../../components/chatList";
import { Header } from "../../components/header";
import { ChatBox } from "../../components/chatBox";


// hooks
import { useExtendedChatActions } from "../../hooks/useExtendedChatActions";

// types 
import { HomeProps } from "./types";

// dummy data 
import { Users, Messages, PersonalChats,CurrentUser } from "../../dummy_data";


export const Home = ({ onAuthAction }: HomeProps) => {
    const { activeChatId, activeMessages, friendList, onAction } = useExtendedChatActions();

  //   useEffect(() => {
  //   window.localStorage.setItem("Users", JSON.stringify(Users));
  //   window.localStorage.setItem("Messages", JSON.stringify(Messages));
  //     window.localStorage.setItem("PersonalChats", JSON.stringify(PersonalChats));
  //     window.localStorage.setItem("CurrentUser", JSON.stringify(CurrentUser));
  // },[])
    
    return (
        <Layout>
        <Layout.Slot name="header">
          <Header onAuthAction={onAuthAction}/>
      </Layout.Slot>
      <Layout.Slot name="leftPanel">
         <ChatList friendList={friendList} onAction={onAction} activeChatId={activeChatId}/>
      </Layout.Slot>
      <Layout.Slot name="rightPanel">
          <ChatBox
            activeChatId={activeChatId}
            activeMessages={activeMessages}
            onAction={onAction}
          />
        </Layout.Slot>
      </Layout>
    )
}
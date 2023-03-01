// libs
import { useEffect } from "react";

// components
import { Layout } from "../../components/layout";
import { ChatList } from "../../components/chatList";
import { Header } from "../../components/header";
import { ChatBox } from "../../components/chatBox";

// hooks
import { useChatActions } from "../../hooks/useChatActions";

// types 
import { onAuthActionType } from "../../types";


type HomeProps = {
    onAuthAction:onAuthActionType
}


export const Home = ({ onAuthAction }: HomeProps) => {
  const { activeChatId, activeMessages, onAction } = useChatActions();

  return (
    <Layout>
      <Layout.Slot name="header">
        <Header onAuthAction={onAuthAction} />
      </Layout.Slot>
      <Layout.Slot name="leftPanel">
        <ChatList onAction={onAction} activeChatId={activeChatId} />
      </Layout.Slot>
      <Layout.Slot name="rightPanel">
        <ChatBox
          activeChatId={activeChatId}
          activeMessages={activeMessages}
          onAction={onAction}
        />
      </Layout.Slot>
    </Layout>
  );
};

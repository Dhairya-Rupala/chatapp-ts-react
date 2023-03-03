// components
import { Layout } from "../../components/layout";
import { ChatList } from "../../components/chatList";
import { Header } from "../../components/header";
import { ChatBox } from "../../components/chatBox";

// hooks
import { useChatActions } from "../../hooks/useChatActions";





export const Home = () => {
  const { activeChatRoomId, activeMessages,changeActiveChatRoom, onAction } = useChatActions();

  return (
    <Layout>
      <Layout.Slot name="header">
        <Header />
      </Layout.Slot>
      <Layout.Slot name="leftPanel">
        <ChatList onItemClick={changeActiveChatRoom} activeChatRoomId={activeChatRoomId} />
      </Layout.Slot>
      <Layout.Slot name="rightPanel">
        <ChatBox
          activeChatRoomId={activeChatRoomId}
          activeMessages={activeMessages}
          onAction={onAction}
        />
      </Layout.Slot>
    </Layout>
  );
};

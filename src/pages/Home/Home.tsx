// components
import { Layout } from "../../components/layout";
import { ChatList } from "../../components/chatList";
import { Header } from "../../components/header";
import { ChatBox } from "../../components/chatBox";

// hooks
import { useChatRoom } from "../../hooks/useChatRoom";





export const Home = () => {
  const { activeChatRoomId,changeActiveChatRoom,  } = useChatRoom();

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
        />
      </Layout.Slot>
    </Layout>
  );
};

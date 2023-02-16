// styles
import "./styles.css";
// components
import Layout from "./components/layout/Layout";
import Header from "./components/header/Header";
import ChatList from "./components/chatList/ChatList";
import ChatBox from "./components/chatBox/ChatBox";
// hooks
import useChatActions from "./hooks/useChatActions";
// context
import { UserContext } from "./contexts/UserContext";

export default function App() {
  const { userChats, currentChat, user, onAction } = useChatActions();
  return (
    <UserContext.Provider value={user}>
      <Layout
        top={<Header onAction={onAction} />}
        left={<ChatList userChats={userChats} onAction={onAction} currentChat={currentChat}/>}
        right={
          <ChatBox
            currentChat={currentChat}
            userChats={userChats}
            onAction={onAction}
          />
        }
      />
    </UserContext.Provider>
  );
}

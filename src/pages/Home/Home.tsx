// components 
import { Layout } from "../../components/layout";
import { ChatList } from "../../components/chatList";
import { Header } from "../../components/header";
import { ChatBox } from "../../components/chatBox";

// context
import { useUser } from "../../contexts/UserContext";

// hooks
import { useExtendedChatActions } from "../../hooks/useExtendedChatActions";

// dummy data 
import { Users, Messages, PersonalChats } from "../../dummy_data";


export const Home = () => {
    const user = useUser()
    const { activeChatId, activeMessages, friendList, onAction } = useExtendedChatActions(user);

    // useEffect(() => {
  //   window.localStorage.setItem("Users", JSON.stringify(Users));
  //   window.localStorage.setItem("Messages", JSON.stringify(Messages));
  //   window.localStorage.setItem("PersonalChats", JSON.stringify(PersonalChats));
  // },[])
    
    return (
        <Layout>
        <Layout.Slot name="header">
          <Header onAction={onAction}/>
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
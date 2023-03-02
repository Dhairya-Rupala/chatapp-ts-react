// libs 
import { Routes, Route } from "react-router-dom"
import { useEffect } from "react";

// components 
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { SignUp } from "./pages/SignUp";

// hooks
import { useUser } from "./contexts/UserContext"

// dummy data 
import { Users, Messages, PersonalChats,CurrentUser } from "./dummy_data";

// styles
import "./styles.css";



export default function App() {
  const { user, error, onAuthAction } = useUser()

  //  useEffect(() => {
  //   window.localStorage.setItem("Users", JSON.stringify(Users));
  //   window.localStorage.setItem("Messages", JSON.stringify(Messages));
  //     window.localStorage.setItem("PersonalChats", JSON.stringify(PersonalChats));
  // },[])
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={user ? <Home onAuthAction={onAuthAction} /> : <Login onAuthAction={onAuthAction} error={error} /> } />
        <Route path="login" element={<Login onAuthAction={onAuthAction} error={error}/>} />
        <Route path="signup" element={<SignUp onAuthAction={onAuthAction} error={error}/> } />
      </Routes>
    </div>
  );
}

// Snippet for the data fetching

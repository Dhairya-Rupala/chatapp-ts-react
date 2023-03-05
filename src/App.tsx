// libs 
import { Routes, Route } from "react-router-dom"

// components 
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { SignUp } from "./pages/SignUp";


// hooks
import { useUser } from "./contexts/UserContext";
import { useInitializeDB } from "./hooks/useInitializeDB";

// styles
import "./styles.css";



export default function App() {
  const { user } = useUser()
  useInitializeDB();
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={user ? <Home /> : <Login /> } />
        <Route path="login" element={<Login/>} />
        <Route path="signup" element={<SignUp/> } />
      </Routes>
    </div>
  );
}


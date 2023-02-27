// libs 
import { Routes, Route } from "react-router-dom"

// components 
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { SignUp } from "./pages/SignUp";

// hooks
import {useUser} from "./contexts/UserContext"


// styles
import "./styles.css";



export default function App() {
  const { user,error, onAuthAction } = useUser()
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
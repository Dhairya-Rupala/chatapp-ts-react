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
  const [user, onAuthAction] = useUser()
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={user ? <Home onAuthAction={onAuthAction}/> : <Login onAuthAction={onAuthAction} /> } />
        <Route path="login" element={<Login onAuthAction={onAuthAction} />} />
        <Route path="signup" element={<SignUp onAuthAction={onAuthAction} /> } />
      </Routes>
    </div>
  );
}




/*
Workflow 

if the user is logged in then show the home page for that user

check the user exists or not in the localstorage 

make the context for the user and setuser on the top level 

login/signup will be using the setUser functionality for setting the user


*/
// libs 
import { Routes, Route } from "react-router-dom"

// components 
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { SignUp } from "./pages/SignUp";


// styles
import "./styles.css";



export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={ <SignUp/> } />
      </Routes>
    </div>
  );
}
// libs 
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
// components 
import App from './App';
// context 
import { UserAuthentication } from './components/userAuthentication';
// styles
import './index.css';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserAuthentication>
       <App />
    </UserAuthentication>
    </BrowserRouter>
  </React.StrictMode>
);

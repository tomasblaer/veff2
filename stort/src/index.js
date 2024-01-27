import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import DefaultPage from './pages/default/DefaultPage';
import ProfilePage from './pages/profile/ProfilePage';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<ProfilePage/>} />
        <Route path="/404" element={<DefaultPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

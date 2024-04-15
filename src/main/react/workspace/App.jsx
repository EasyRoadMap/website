import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main.jsx';
import Projects from './pages/Projects.jsx';
import Project from './pages/Project.jsx';
import './global.css';
import { StrictMode } from 'react';
import { PopupProvider } from "react-popup-manager";

function App() {
  return (
    <PopupProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/workspace" element={<Project />} />
        </Routes>
      </BrowserRouter>
    </PopupProvider>
  )
}

export default App;

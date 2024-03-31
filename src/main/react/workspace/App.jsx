import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main.jsx';
import Projects from './pages/Projects.jsx';
import './global.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/workspace" element={<Projects />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

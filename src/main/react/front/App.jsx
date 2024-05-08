import { BrowserRouter, Routes, Route } from "react-router-dom";
import Project from "./pages/Project.jsx";
import Main from "./pages/Main.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Main />} />
        <Route path="" element={<Project />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

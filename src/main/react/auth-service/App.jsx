import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Recovery from "./pages/Recovery.jsx";
import RecoveryCode from "./pages/RecoveryCode.jsx";
import StartPage from "./pages/StartPage.jsx";
import SignIn from "./pages/SignIn.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<StartPage />} />
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/auth/recovery" element={<Recovery />} />
        <Route path="/auth/recovery-code" element={<RecoveryCode />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

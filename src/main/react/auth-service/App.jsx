import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Recovery from "./pages/Recovery.jsx";
import RecoveryCode from "./pages/RecoveryCode.jsx";
import StartPage from "./pages/StartPage.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUpEmail from "./pages/SignUpEmail.jsx";
import Confirmation from "./pages/Confirmation.jsx";
import SignUp from "./pages/SignUp.jsx";
import SignUpDone from "./pages/SignUpDone.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<StartPage />} />
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/auth/recovery/email-code" element={<Recovery />} />
        <Route path="/auth/recovery/set-password" element={<RecoveryCode />} />

        <Route path="/auth/sign-up" element={<SignUpEmail />} />
        <Route path="/auth/sign-up/email-code" element={<Confirmation />} />
        <Route path="/auth/sign-up/setup-account" element={<SignUp />} />
        <Route path="/auth/sign-up/complete" element={<SignUpDone />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

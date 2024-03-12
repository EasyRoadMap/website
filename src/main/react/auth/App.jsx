import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Recovery from "./pages/recovery/Recovery.jsx";
import RecoveryCode from "./pages/recovery/RecoveryCode.jsx";
import StartPage from "./pages/StartPage.jsx";
import SignIn from "./pages/sign-in/SignIn.jsx";
import CreateAccount from "./pages/sign-up/CreateAccount.jsx";
import Confirmation from "./pages/sign-up/Confirmation.jsx";
import SetupAccount from "./pages/sign-up/SetupAccount.jsx";
import SignUpDone from "./pages/sign-up/Complete.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<StartPage />} />
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/auth/recovery/email-code" element={<RecoveryCode />} />
        <Route path="/auth/recovery/set-password" element={<Recovery />} />

        <Route path="/auth/sign-up" element={<CreateAccount />} />
        <Route path="/auth/sign-up/email-code" element={<Confirmation />} />
        <Route path="/auth/sign-up/setup-account" element={<SetupAccount />} />
        <Route path="/auth/sign-up/complete" element={<SignUpDone />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

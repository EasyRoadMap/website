import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Recovery from "./pages/recovery/ChangePassword.jsx";
import RecoveryCode from "./pages/recovery/ReceiveCode.jsx";
import RecoveryComplete from "./pages/recovery/Complete.jsx";

import SignIn from "./pages/sign-in/SignIn.jsx";

import SignUpDone from "./pages/sign-up/Complete.jsx";
import CreateAccount from "./pages/sign-up/SetupAccount.jsx";
import SignUpCode from "./pages/sign-up/Confirmation.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/auth/recovery/email-code" element={<RecoveryCode />} />
        <Route path="/auth/recovery/change-password" element={<Recovery />} />
        <Route path="/auth/recovery/complete" element={<RecoveryComplete />} />

        <Route path="/auth/sign-up" element={<CreateAccount />} />
        <Route path="/auth/sign-up/email-code" element={<SignUpCode />} />
        <Route path="/auth/sign-up/complete" element={<SignUpDone />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

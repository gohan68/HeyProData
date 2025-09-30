import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import OTP from "./pages/OTP";
import OnboardingName from "./pages/OnboardingName";
import OnboardingLocation from "./pages/OnboardingLocation";
import OnboardingUsername from "./pages/OnboardingUsername";
import ProfilePhoto from "./pages/ProfilePhoto";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/onboarding/name" element={<OnboardingName />} />
          <Route path="/onboarding/location" element={<OnboardingLocation />} />
          <Route path="/onboarding/username" element={<OnboardingUsername />} />
          <Route path="/onboarding/profile-photo" element={<ProfilePhoto />} />
          <Route path="/profile-photo" element={<ProfilePhoto />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import AuthLanding from "./pages/AuthLanding";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<AuthLanding />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
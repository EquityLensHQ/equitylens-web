import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import AuthLanding from "./pages/AuthLanding";
import Dashboard from "./pages/Dashboard";
import MarketOverview from "./pages/MarketOverview";
import MacroStats from "./pages/MacroStats";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<AuthLanding />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/market" element={<MarketOverview />} />
      <Route path="/macrostats" element={<MacroStats />} />
    </Routes>
  );
}
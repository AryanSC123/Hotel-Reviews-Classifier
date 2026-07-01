import { BrowserRouter, Routes, Route } from "react-router-dom";
import Overview from "./pages/Overview";
import Playground from "./pages/Playground";
import Navbar from "./components/layout/Navbar";
import Analytics from "./pages/Analytics";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Invoice from "./pages/Invoice";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Invoice from "./pages/Invoice";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/invoice" element={<Invoice />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

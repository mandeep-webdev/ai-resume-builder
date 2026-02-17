import { Routes, Route } from "react-router";
import Builder from "./pages/Builder";
import Auth from "./pages/Auth";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Builder />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/builder" element={<Builder />} />
      </Routes>
    </>
  );
}

export default App;

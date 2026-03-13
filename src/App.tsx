import { Routes, Route } from "react-router";
import Builder from "./pages/Builder";

import Home from "./pages/Home";
import Templates from "./pages/Templates";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/templates" element={<Templates />} />

        <Route path="/builder/:tempId" element={<Builder />} />
      </Routes>
    </>
  );
}

export default App;

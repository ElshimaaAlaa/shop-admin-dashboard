import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllCategory from "./Categories/All Categories/AllCategory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllCategory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

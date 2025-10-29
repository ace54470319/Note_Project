// Routes/Route 방식
import { Routes, Route } from "react-router-dom";
import MainPage from "./component/jsx/MainPage";
import TestPage from "./component/jsx/Testpage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

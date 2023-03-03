import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Questions from "./pages/Questions";
import Register from "./pages/Register";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/questions" element={<Questions />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

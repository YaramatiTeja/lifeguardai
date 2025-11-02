import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* 🔹 Navbar always visible */}
        <Navbar />

        {/* 🔹 Main content area grows to fill space */}
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </div>

        {/* 🔹 Sticky Footer always visible */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;

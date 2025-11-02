import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark  shadow-sm sticky-top"
      style={{ padding: "0.7rem 1.5rem ", background: "linear-gradient(90deg, #0d6efd, #6f42c1)" }}
    >
      <div className="container-fluid">
        {/* 🔹 Left Side: Logo + Title */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
            alt="logo"
            width="35"
            height="35"
            className="me-2"
            style={{ borderRadius: "50%" }}
          />
          <span className="fw-bold fs-5">Lifeguard-AI</span>
        </Link>

        {/* 🔹 Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* 🔹 Right Side: Nav Links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <Link className="nav-link text-white px-3" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white px-3" to="/register">Register</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white px-3" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white px-3" to="/chat">Chat</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

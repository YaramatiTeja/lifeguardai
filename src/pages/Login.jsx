import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = form;

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    // ✅ Check user credentials from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      setError("Invalid email or password.");
      return;
    }

    // ✅ Store logged-in user info
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    alert(`✅ Welcome back, ${user.username || "User"}!`);
    navigate("/chat");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f5f7fa" }}
    >
      <div className="card shadow-lg p-3" style={{ width: "380px", borderRadius: "15px" }}>
        <h3 className="text-center mb-4 text-success fw-bold">Login</h3>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            className="form-control mb-3"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            className="form-control mb-3"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <button className="btn btn-success w-100" type="submit">
            Login
          </button>
        </form>

        <p className="text-center mt-3">
          Don’t have an account?{" "}
          <span
            className="text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;

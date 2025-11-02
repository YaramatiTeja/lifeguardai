import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, password, confirm } = form;

    if (!username || !email || !password || !confirm) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    // ✅ Save user data to localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.find((u) => u.email === email);

    if (userExists) {
      setError("Email already registered.");
      return;
    }

    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("✅ Registered successfully! Please login.");
    navigate("/login");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f5f7fa" }}
    >
      <div className="card shadow-lg p-3" style={{ width: "380px", borderRadius: "15px" }}>
        <h3 className="text-center mb-4 text-success fw-bold">Register</h3>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            className="form-control mb-3"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          />
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
          <input
            type="password"
            name="confirm"
            className="form-control mb-3"
            placeholder="Confirm Password"
            value={form.confirm}
            onChange={handleChange}
          />
          <button className="btn btn-success w-100" type="submit">
            Register
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <span
            className="text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;

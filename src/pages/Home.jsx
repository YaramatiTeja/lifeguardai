import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      {/* 🌄 Hero Section */}
      <section
        className="hero d-flex align-items-center text-center text-light"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506126613408-eca07ce68773')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "90vh",
          position: "relative",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        ></div>
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <h1 className="fw-bold mb-3">Find Hope, Healing & Support</h1>
          <p className="fs-5 mb-4">
            Lifeguard-AI listens when you need to talk — a caring companion powered by AI.
          </p>
          <Link to="/register" className="btn btn-success btn-lg shadow">
            Get Started
          </Link>
        </div>
      </section>

      {/* 🌟 Features Section */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="fw-bold text-primary mb-4">How Lifeguard-AI Helps You</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card shadow border-0 h-100">
                <div className="card-body">
                  <h5 className="card-title text-primary fw-bold">💬 Chat Safely</h5>
                  <p className="text-muted">
                    Talk openly with an AI trained to listen and respond with empathy and care.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow border-0 h-100">
                <div className="card-body">
                  <h5 className="card-title text-success fw-bold">🌿 Find Peace</h5>
                  <p className="text-muted">
                    Get mindful insights, relaxation tips, and positive guidance for your mental health.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow border-0 h-100">
                <div className="card-body">
                  <h5 className="card-title text-warning fw-bold">💛 You're Not Alone</h5>
                  <p className="text-muted">
                    Reach out when you need it most — because talking helps and hope heals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

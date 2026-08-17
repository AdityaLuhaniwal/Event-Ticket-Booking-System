import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({
        email,
        password,
      });

      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.userId);

      alert(response.message);

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="auth-bg">
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-lg-5 col-md-7">

            <div className="auth-card">

              <div className="text-center mb-4">

                <i className="bi bi-ticket-perforated-fill auth-logo"></i>

                <h1 className="auth-heading">
                  Welcome Back
                </h1>

                <p className="auth-subtitle">
                  Book India's Best Events.
                </p>

              </div>
              <form onSubmit={handleLogin}>

                <div className="mb-3">

                  <label
                    className="form-label fw-semibold"
                    style={{ color: "#111827" }}
                  >
                    Email Address
                  </label>

                  <div className="input-group">

                    <span className="input-group-text">
                      <i className="bi bi-envelope-fill"
                      style={{ color: "#1f2937" }}></i>
                    </span>

                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />

                  </div>

                </div>

                <div className="mb-4">

                  <label
                    className="form-label fw-semibold"
                    style={{ color: "#111827" }}
                  >
                    Password
                  </label>

                  <div className="input-group">

                    <span className="input-group-text">
                      <i className="bi bi-lock-fill"
                      style={{ color: "#1f2937" }}></i>
                    </span>

                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />

                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                    >
                      <i
                        className={
                          showPassword
                            ? "bi bi-eye-slash-fill"
                            : "bi bi-eye-fill"
                        }
                      ></i>
                    </button>

                  </div>

                </div>

                <button
                  type="submit"
                  className="btn btn-warning w-100 py-2 fw-bold"
                >
                  Login
                </button>

              </form>

              <div className="auth-footer">

                <span>
                  Don't have an account?
                </span>

                <Link to="/register"
                className="auth-link ms-2">
                  Register
                </Link>

              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
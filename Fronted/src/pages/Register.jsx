import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import "../styles/auth.css";

function Register() {

  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      const response = await registerUser({
        fullName,
        email,
        password
      });

      alert("Registration Successful");

      navigate("/login");

    } catch (error) {

      alert(
        error.response?.data?.message || "Registration Failed"
      );

    }

  };

  return (

    <div className="auth-bg">

      <div className="container">

        <div className="row justify-content-center align-items-center min-vh-100">

          <div className="col-lg-5 col-md-7">

            <div className="auth-card">

              {/* Header */}

              <div className="text-center mb-4">

                <i className="bi bi-ticket-perforated-fill auth-logo"></i>

                <h1 className="auth-heading">
                  Create Account
                </h1>

                <p className="auth-subtitle">
                  Join India's Best Events.
                </p>

              </div>


              {/* Register Form */}

              <form onSubmit={handleRegister}>

                {/* Full Name */}

                <div className="mb-3">

                  <label className="form-label">
                    Full Name
                  </label>

                  <div className="input-group">

                    <span className="input-group-text">
                      <i className="bi bi-person-fill"></i>
                    </span>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />

                  </div>

                </div>


                {/* Email */}

                <div className="mb-3">

                  <label className="form-label">
                    Email Address
                  </label>

                  <div className="input-group">

                    <span className="input-group-text">
                      <i className="bi bi-envelope-fill"></i>
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


                {/* Password */}

                <div className="mb-4">

                  <label className="form-label">
                    Password
                  </label>

                  <div className="input-group">

                    <span className="input-group-text">
                      <i className="bi bi-lock-fill"></i>
                    </span>

                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Create a password"
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


                {/* Register Button */}

                <button
                  className="btn btn-warning w-100 py-2 fw-bold"
                  type="submit"
                >
                  Register
                </button>

              </form>


              {/* Login Link */}

              <p className="auth-footer">
    <span>Already have an account?</span>

    <Link
        to="/login"
        className="ms-2"
    >
        Login
    </Link>
</p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Register;
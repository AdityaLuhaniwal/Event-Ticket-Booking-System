import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {

  localStorage.removeItem("token");
  localStorage.removeItem("userId");

  alert("Logout Successful");

  navigate("/login");

};

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">

        <Link className="navbar-brand fw-bold fs-3" to="/">
          <i className="bi bi-ticket-perforated-fill text-warning"></i>{" "}
          EventBooking
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav ms-auto align-items-center">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/events">
                Events
              </Link>
            </li>

            {token ? (
  <>
    <li className="nav-item">
      <Link className="nav-link" to="/profile">
        Profile
      </Link>
    </li>

    <li className="nav-item ms-2">
      <button
        className="btn btn-danger rounded-pill px-4"
        onClick={handleLogout}
      >
        Logout
      </button>
    </li>
  </>
) : (
  <>
    <li className="nav-item">
      <Link className="nav-link" to="/login">
        Login
      </Link>
    </li>

    <li className="nav-item ms-2">
      <Link className="nav-link navbar-register" to="/register">
        Register
      </Link>
    </li>
  </>
)}

          </ul>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
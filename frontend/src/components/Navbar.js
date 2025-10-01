import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">EMS</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            {token && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/employees">Employees</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/create">Add Employee</Link></li>
              </>
            )}
          </ul>
          <ul className="navbar-nav ms-auto">
            {token ? (
              <li className="nav-item">
                <button className="btn btn-light btn-sm" onClick={logout}>Logout</button>
              </li>
            ) : (
              <>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

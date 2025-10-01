// src/components/EmployeeList.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/api/employees/", {
        headers: { Authorization: `Token ${token}` },
      });
      setEmployees(res.data);
    } catch (err) {
      console.error("Error fetching employees:", err);
      alert("Error fetching employees");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      const token = localStorage.getItem("token");
      await API.delete(`/api/employees/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      fetchEmployees();
    } catch (err) {
      console.error("Error deleting employee:", err);
      alert("Error deleting employee");
    }
  };

  const filtered = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase()) ||
      emp.position.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="card p-3 shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Employees</h3>
        <Link to="/create" className="btn btn-success">
          + Add Employee
        </Link>
      </div>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name, department, or position..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Department</th>
            <th>Position</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Salary</th>
            <th style={{ width: "160px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? (
            filtered.map((emp) => (
              <tr key={emp.id}>
                <td>
                  {emp.photo_url ? (
                    <img
                      src={emp.photo_url}
                      alt={emp.name}
                      style={{ width: 50, height: 50, borderRadius: "50%" }}
                    />
                  ) : (
                    <span className="text-muted">No Photo</span>
                  )}
                </td>
                <td>{emp.name}</td>
                <td>{emp.department}</td>
                <td>{emp.position}</td>
                <td>{emp.email}</td>
                <td>{emp.phone}</td>
                <td>{emp.salary}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => navigate(`/edit/${emp.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(emp.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center text-muted">
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

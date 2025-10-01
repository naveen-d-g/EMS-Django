// src/components/EmployeeCard.js
import React from "react";

export default function EmployeeCard({ employee }) {
  const photoUrl = employee.photo
    ? `http://127.0.0.1:8000${employee.photo}`
    : "https://via.placeholder.com/150x150.png?text=No+Photo";

  return (
    <div
      className="card shadow-sm border-0 rounded-3"
      style={{
        width: "18rem",
        margin: "1rem",
        background: "linear-gradient(135deg, #f0f8ff, #e6f7ff)",
      }}
    >
      <img
        src={photoUrl}
        className="card-img-top rounded-top"
        alt={employee.name}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title text-primary">{employee.name}</h5>
        <p className="card-text mb-1">
          <strong>Department:</strong> {employee.department}
        </p>
        <p className="card-text mb-1">
          <strong>Position:</strong> {employee.position}
        </p>
        <p className="card-text mb-1">
          <strong>Email:</strong> {employee.email}
        </p>
        <p className="card-text">
          <strong>Phone:</strong> {employee.phone}
        </p>
      </div>
    </div>
  );
}

// src/components/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      // server register route in your backend (you have /api/register/ or /register/ depending)
      const res = await API.post("/api/register/", form); // uses baseURL http://127.0.0.1:8000
      alert("Registered. Please log in.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="card mx-auto p-4" style={{ maxWidth: 480 }}>
      <h4 className="card-title mb-3">Register</h4>
      <form onSubmit={submit}>
        <div className="mb-2">
          <label className="form-label">Username</label>
          <input className="form-control" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        </div>
        <button className="btn btn-success">Create account</button>
      </form>
    </div>
  );
}

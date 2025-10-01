// src/components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const res = await API.post(
      "http://127.0.0.1:8000/api-token-auth/",  // ✅ absolute URL
      {
        username: form.username,
        password: form.password,
      },
      {
        headers: { "Content-Type": "application/json" },  // ✅ ensure JSON
      }
    );

    const token = res.data.token;
    localStorage.setItem("token", token);
    localStorage.setItem("username", form.username);
    navigate("/employees");
  } catch (err) {
    console.error("Login error:", err);
    alert(
      err?.response?.data?.non_field_errors?.[0] ||
        err?.response?.data?.detail ||
        "Login failed"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="card mx-auto p-4" style={{ maxWidth: 480 }}>
      <h4 className="card-title mb-3">Login</h4>
      <form onSubmit={submit}>
        <div className="mb-2">
          <label className="form-label">Username</label>
          <input className="form-control" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <button className="btn btn-primary" disabled={loading}>{loading ? "Signing in..." : "Login"}</button>
          <a className="small" href="/register">Create account</a>
        </div>
      </form>
    </div>
  );
}

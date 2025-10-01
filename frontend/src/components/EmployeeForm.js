// src/components/EmployeeForm.js
import React, { useState, useEffect } from "react";
import API from "../api";
import { useNavigate, useParams } from "react-router-dom";

export default function EmployeeForm() {
  const [form, setForm] = useState({
    name: "",
    department: "",
    position: "",
    email: "",
    phone: "",
    salary: "",
    photo: null,
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // detect edit mode

  // Load existing employee if editing
  useEffect(() => {
    if (id) {
      API.get(`/api/employees/${id}/`)
        .then((res) => {
          setForm({
            name: res.data.name || "",
            department: res.data.department || "",
            position: res.data.position || "",
            email: res.data.email || "",
            phone: res.data.phone || "",
            salary: res.data.salary || "",
            photo: null,
          });
        })
        .catch((err) => console.error("Error fetching employee:", err));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key] !== null) {
        formData.append(key, form[key]);
      }
    });

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      if (id) {
        await API.put(`/api/employees/${id}/`, formData, config);
        alert("Employee updated successfully!");
      } else {
        await API.post("/api/employees/", formData, config);
        alert("Employee created successfully!");
      }

      navigate("/employees");
    } catch (err) {
      console.error("Save error:", err.response ? err.response.data : err.message);
      alert("Error saving employee. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card p-3 shadow-sm"
      style={{ maxWidth: 600, margin: "1rem auto" }}
    >
      <h4 className="mb-3">{id ? "Edit Employee" : "Add Employee"}</h4>

      <div className="mb-2">
        <label className="form-label">Name</label>
        <input
          name="name"
          className="form-control"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Department</label>
        <input
          name="department"
          className="form-control"
          value={form.department}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Position</label>
        <input
          name="position"
          className="form-control"
          value={form.position}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Phone</label>
        <input
          name="phone"
          className="form-control"
          value={form.phone}
          onChange={handleChange}
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Salary</label>
        <input
          type="number"
          step="0.01"
          name="salary"
          className="form-control"
          value={form.salary}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Photo</label>
        <input type="file" className="form-control" onChange={handleFileChange} />
      </div>

      <button type="submit" className="btn btn-success" disabled={loading}>
        {loading ? "Saving..." : id ? "Update" : "Create"}
      </button>
    </form>
  );
}

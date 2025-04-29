"use client"
import { useState } from "react";

export default function AddDoctor() {
  const [form, setForm] = useState({
    name: "",
    gender: "",
    specialty: "",
    language: "",
    fees: "",
    availability: "",
    experience: "",
    rating: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/add-doctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          language: form.language.split(",").map((lang) => lang.trim()),
          fees: parseInt(form.fees),
          experience: parseInt(form.experience),
          rating: parseFloat(form.rating),
        }),
      });
      if (response.ok) {
        setMessage(response.message);
        setForm({
          name: "",
          gender: "",
          specialty: "",
          language: "",
          fees: "",
          availability: "",
          experience: "",
          rating: "",
        });
      } else {
        setMessage("Failed to add doctor.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
   };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Add a Doctor</h1>
        <form onSubmit={handleSubmit} className="grid gap-4">
          {[
            { label: "Name", name: "name" },
            { label: "Gender", name: "gender" },
            { label: "Specialty", name: "specialty" },
            { label: "Languages (comma-separated)", name: "language" },
            { label: "Fees", name: "fees", type: "number" },
            { label: "Availability", name: "availability" },
            { label: "Experience (years)", name: "experience", type: "number" },
            { label: "Rating (1-5)", name: "rating", type: "number", step: "0.1" },
          ].map(({ label, name, type = "text", step }) => (
            <div key={name}>
              <label className="block font-medium text-gray-700 mb-1">{label}</label>
              <input
                type={type}
                step={step}
                name={name}
                value={form[name]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {loading ? "Submitting..." : "Add Doctor"}
          </button>
          {message && (
            <p className="text-center text-sm text-green-600 font-medium">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
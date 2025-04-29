"use client";
import React from 'react'
import { useEffect, useState } from "react";
const Destination = () => {
    const [doctorData, setDoctorData] = useState([]);
    const [filters, setFilters] = useState({
      gender: "",
      language: "",
      minRating: "",
      maxFees: "",
      experience: ""
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 3;
  
  
  
    useEffect(() => {
      const getDoctors = async () => {
        const query = new URLSearchParams({
          page: currentPage.toString(),
          limit: limit.toString(),
          ...(filters.gender && { gender: filters.gender }),
          ...(filters.language && { language: filters.language }),
          ...(filters.minRating && { minRating: filters.minRating }),
          ...(filters.maxFees && { maxFees: filters.maxFees }),
          ...(filters.experience && { experience: filters.experience }),
        });
    
        const res = await fetch(`/api/list-doctor?${query.toString()}`);
        const data = await res.json();
        setDoctorData(data.doctors);
        setTotalPages(data.totalPages || 1);
      };
  
      getDoctors();
    },[currentPage, filters]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFilters((prev) => ({ ...prev, [name]: value }));
      setCurrentPage(1); // Reset to page 1 when filters change
    };
  
    const generateStructuredData = (doctors) => {
      return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Doctors Listing",
        "itemListElement": doctors.map((doctor, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Physician",
            "name": doctor.name,
            "medicalSpecialty": doctor.specialty,
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "India",
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": doctor.rating,
              "reviewCount": 50,
            },
          },
        })),
      };
    };
  
    return (
      <>
      {doctorData.length > 0 && (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(generateStructuredData(doctorData)),
      }}
    />
  )}
      <div className="p-4 max-w-6xl mx-auto">
    <h1 className="text-3xl font-bold text-indigo-700 mb-8 text-center">
      Find the Right Doctor for You
    </h1>
  
    {/* Filters */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
      <select
        name="gender"
        value={filters.gender}
        onChange={handleChange}
        className="border border-indigo-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        <option value="">Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
  
      <select
        name="language"
        value={filters.language}
        onChange={handleChange}
        className="border border-indigo-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        <option value="">Language</option>
        <option value="English">English</option>
        <option value="Hindi">Hindi</option>
        <option value="Bengali">Bengali</option>
      </select>
  
      <input
        type="number"
        name="minRating"
        value={filters.minRating}
        onChange={handleChange}
        placeholder="Min Rating"
        min={0}
        max={5}
        step="0.1"
        className="border border-indigo-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
  
      <input
        type="number"
        name="maxFees"
        value={filters.maxFees}
        onChange={handleChange}
        placeholder="Max Fees"
        className="border border-indigo-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
  
      <input
        type="number"
        name="experience"
        value={filters.experience}
        onChange={handleChange}
        placeholder="Experience (yrs)"
        className="border border-indigo-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </div>
  
    {/* Doctor Cards */}
    {doctorData.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {doctorData.map((doctor) => (
          <div
            key={doctor.id}
            className="border border-gray-200 rounded-xl shadow-md hover:shadow-lg p-6 transition duration-200 bg-white"
          >
            <h2 className="text-xl font-semibold text-indigo-700 mb-2">
              {doctor.name}
            </h2>
            <p className="text-gray-600 mb-1">
              <strong>Specialty:</strong> {doctor.specialty}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Languages:</strong> {doctor.language?.join(", ")}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Fees:</strong> ₹{doctor.fees}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Availability:</strong> {doctor.availability}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Experience:</strong> {doctor.experience} years
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {doctor.gender}
              </span>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                ⭐ {doctor.rating}
              </span>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-center text-gray-600 mt-10">
        No doctors found for the selected filters.
      </p>
    )}
  
    {/* Pagination */}
    <div className="flex justify-center items-center mt-10 gap-4">
      <button
        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 disabled:opacity-50"
      >
        Previous
      </button>
      <span className="text-lg font-medium text-indigo-800">
        Page {currentPage}
      </span>
      <button
        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
      </>
    );
}

export default Destination
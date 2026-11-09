"use client";

import React, { useState } from "react";

export default function RecommendationPage() {
  // Pilihan opsi statis yang disesuaikan dengan standar ID di engine.py
  const interestOptions = [
    { label: "Teknologi dan AI", value: "technology" },
    { label: "Data dan analisis", value: "data" },
    { label: "Komunitas dan kegiatan sosial", value: "community" },
    { label: "Pemberdayaan perempuan", value: "women_empowerment" },
    { label: "Lingkungan dan keberlanjutan", value: "environment" },
    { label: "Pendidikan dan belajar", value: "learning" },
    { label: "Komunikasi dan kepemimpinan", value: "communication" },
    { label: "Desain dan kreativitas", value: "design" },
    { label: "Karier dan pengembangan diri", value: "career" },
    { label: "Menulis dan membaca", value: "writing" }
  ];

  const skillOptions = [
    { label: "Literasi digital", value: "digital_literacy" },
    { label: "Python dasar", value: "python_basic" },
    { label: "Analisis data", value: "data_analysis" },
    { label: "Spreadsheet / Excel", value: "spreadsheet" },
    { label: "Komunikasi", value: "communication" },
    { label: "Kerja sama tim", value: "teamwork" },
    { label: "Menulis", value: "writing" },
    { label: "Desain", value: "design" },
    { label: "Presentasi", value: "presentation" },
    { label: "Mengajar", value: "teaching" },
    { label: "Organisasi kegiatan", value: "organization" },
    { label: "Membaca", value: "reading" },
    { label: "Berpikir kritis", value: "critical_thinking" },
    { label: "Pemecahan masalah", value: "problem_solving" },
    { label: "Saya masih pemula / belum yakin", value: "beginner" }
  ];

  const habitOptions = [
    { label: "Belajar mandiri", value: "self_learning" },
    { label: "Membaca", value: "reading" },
    { label: "Konsisten menjalankan rutinitas", value: "consistency" },
    { label: "Bekerja dengan orang lain", value: "teamwork" },
    { label: "Menjadi relawan", value: "volunteering" },
    { label: "Aktivitas luar ruangan", value: "outdoor_activity" },
    { label: "Mencoba dan membuat proyek", value: "problem_solving" }
  ];

  // State Form
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedHabits, setSelectedHabits] = useState([]);
  const [timeAvailable, setTimeAvailable] = useState(30);
  const [difficulty, setDifficulty] = useState("any");

  // State Handler Aplikasi
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  // Toggle Pilihan Array Checkbox
  const handleToggle = (value, list, setList) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  // Submit Data ke Proxy Route Next.js
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults(null);

    const payload = {
      interests: selectedInterests,
      skills: selectedSkills,
      habits: selectedHabits,
      available_minutes: parseInt(timeAvailable, 10),
      preferred_difficulty: difficulty,
      top_n: 5
    };

    try {
      const response = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal mengambil rekomendasi.");
      }

      setResults(data.recommendations);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "8px" }}>Sistem Rekomendasi Aktivitas</h1>
      <p style={{ color: "#666", marginBottom: "32px" }}>Dapatkan rekomendasi aktivitas belajar terbaik berdasarkan profil personalmu.</p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        
        {/* Pilihan Minat */}
        <div>
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "8px" }}>1. Apa Minat Kamu? (Pilih sesuai kesukaan)</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {interestOptions.map((opt) => (
              <label key={opt.value} style={{ display: "flex", gap: "8px", alignItems: "center", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={selectedInterests.includes(opt.value)}
                  onChange={() => handleToggle(opt.value, selectedInterests, setSelectedInterests)}
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        {/* Pilihan Skill */}
        <div>
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "8px" }}>2. Skill yang Kamu Miliki / Ingin Kembangkan:</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {skillOptions.map((opt) => (
              <label key={opt.value} style={{ display: "flex", gap: "8px", alignItems: "center", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={selectedSkills.includes(opt.value)}
                  onChange={() => handleToggle(opt.value, selectedSkills, setSelectedSkills)}
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        {/* Pilihan Kebiasaan */}
        <div>
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "8px" }}>3. Pola Kebiasaan / Gaya Aktivitas Kamu:</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {habitOptions.map((opt) => (
              <label key={opt.value} style={{ display: "flex", gap: "8px", alignItems: "center", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={selectedHabits.includes(opt.value)}
                  onChange={() => handleToggle(opt.value, selectedHabits, setSelectedHabits)}
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        {/* Slot Waktu */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "2px" }}>4. Waktu yang Tersedia Per Hari:</h3>
          <select 
            value={timeAvailable} 
            onChange={(e) => setTimeAvailable(e.target.value)}
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", maxWidth: "300px" }}
          >
            <option value={15}>15 Menit</option>
            <option value={30}>30 Menit</option>
            <option value={45}>45 Menit</option>
            <option value={60}>60 Menit</option>
            <option value={90}>90 Menit atau lebih</option>
          </select>
        </div>

        {/* Tingkat Kesulitan */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "2px" }}>5. Tingkat Kesulitan Aktivitas:</h3>
          <select 
            value={difficulty} 
            onChange={(e) => setDifficulty(e.target.value)}
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", maxWidth: "300px" }}
          >
            <option value="any">Semua Tingkat</option>
            <option value="beginner">Pemula (Beginner)</option>
            <option value="intermediate">Menengah (Intermediate)</option>
          </select>
        </div>

        {/* Tombol Submit */}
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px",
            backgroundColor: loading ? "#999" : "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
            maxWidth: "200px",
            marginTop: "8px"
          }}
        >
          {loading ? "Memproses..." : "Cari Rekomendasi"}
        </button>
      </form>

      {/* Render Error */}
      {error && (
        <div style={{ marginTop: "24px", padding: "12px", backgroundColor: "#ffebee", color: "#c62828", borderRadius: "4px" }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Render Hasil Rekomendasi */}
      {results && (
        <div style={{ marginTop: "40px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "16px", borderBottom: "2px solid #eee", paddingBottom: "8px" }}>
            Hasil Analisis Kesesuaian Aktivitas
          </h2>
          {results.length === 0 ? (
            <p style={{ color: "#666" }}>Tidak ditemukan aktivitas yang cocok dengan kriteria filter tingkat kesulitan.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {results.map((item) => (
                <div key={item.id} style={{ padding: "20px", border: "1px solid #eaeaea", borderRadius: "8px", backgroundColor: "#fafafa" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <h4 style={{ margin: 0, fontSize: "18px", fontWeight: "bold", color: "#333" }}>
                      {item.rank}. {item.title}
                    </h4>
                    <span style={{ padding: "4px 8px", backgroundColor: "#e1f5fe", color: "#0288d1", borderRadius: "4px", fontSize: "14px", fontWeight: "bold" }}>{item.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
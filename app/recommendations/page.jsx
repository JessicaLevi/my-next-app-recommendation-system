"use client";

import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Fallback opsi statis dipakai jika backend belum aktif.
const FALLBACK_OPTIONS = {
  interests: [
    { label: "Teknologi dan AI", value: "technology" },
    { label: "Data dan analisis", value: "data" },
    { label: "Komunitas dan kegiatan sosial", value: "community" },
    { label: "Pemberdayaan perempuan", value: "women_empowerment" },
    { label: "Lingkungan dan keberlanjutan", value: "environment" },
    { label: "Pendidikan dan belajar", value: "learning" },
    { label: "Komunikasi dan kepemimpinan", value: "communication" },
    { label: "Desain dan kreativitas", value: "design" },
    { label: "Karier dan pengembangan diri", value: "career" },
    { label: "Menulis dan membaca", value: "writing" },
  ],
  skills: [
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
    { label: "Saya masih pemula / belum yakin", value: "beginner" },
  ],
  habits: [
    { label: "Belajar mandiri", value: "self_learning" },
    { label: "Membaca", value: "reading" },
    { label: "Konsisten menjalankan rutinitas", value: "consistency" },
    { label: "Bekerja dengan orang lain", value: "teamwork" },
    { label: "Menjadi relawan", value: "volunteering" },
    { label: "Aktivitas luar ruangan", value: "outdoor_activity" },
    { label: "Mencoba dan membuat proyek", value: "problem_solving" },
  ],
  time_options: [15, 30, 45, 60, 90],
};

const DIFFICULTY_OPTIONS = [
  { label: "Semua Tingkat", value: "any" },
  { label: "Pemula (Beginner)", value: "beginner" },
  { label: "Menengah (Intermediate)", value: "intermediate" },
];

const SCORE_BAR_COLOR = (score) => {
  if (score >= 70) return "bg-green-500";
  if (score >= 40) return "bg-yellow-400";
  return "bg-red-400";
};

function CheckboxGroup({ title, options, selected, onToggle }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold">{title}</p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-foreground/[0.02] px-3 py-2 text-sm transition-colors hover:bg-foreground/[0.06] has-[:checked]:border-primary/40 has-[:checked]:bg-primary/5"
          >
            <input
              type="checkbox"
              className="accent-primary"
              checked={selected.includes(opt.value)}
              onChange={() => onToggle(opt.value)}
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  );
}

export default function RecommendationPage() {
  // Opsi form — di-fetch dari backend, fallback ke data statis jika gagal
  const [options, setOptions] = useState(FALLBACK_OPTIONS);

  useEffect(() => {
    fetch("/api/recommendations")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.interests && data?.skills && data?.habits) {
          setOptions(data);
        }
      })
      .catch(() => {
        // Backend belum aktif — gunakan FALLBACK_OPTIONS
      });
  }, []);

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
    setList(
      list.includes(value)
        ? list.filter((item) => item !== value)
        : [...list, value]
    );
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
      top_n: 5,
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
    <section className="relative">
      <div className="bg-grid bg-radial-fade absolute inset-0 -z-10" />

      <div className="mx-auto max-w-3xl px-6 py-20">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-primary">Rekomendasi</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            Sistem Rekomendasi Aktivitas
          </h1>
          <p className="mt-4 text-muted-foreground">
            Dapatkan rekomendasi aktivitas belajar terbaik berdasarkan profil personalmu.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-10 space-y-8">
          <CheckboxGroup
            title="1. Apa Minat Kamu? (Pilih sesuai kesukaan)"
            options={options.interests}
            selected={selectedInterests}
            onToggle={(v) => handleToggle(v, selectedInterests, setSelectedInterests)}
          />

          <CheckboxGroup
            title="2. Skill yang Kamu Miliki / Ingin Kembangkan"
            options={options.skills}
            selected={selectedSkills}
            onToggle={(v) => handleToggle(v, selectedSkills, setSelectedSkills)}
          />

          <CheckboxGroup
            title="3. Pola Kebiasaan / Gaya Aktivitas Kamu"
            options={options.habits}
            selected={selectedHabits}
            onToggle={(v) => handleToggle(v, selectedHabits, setSelectedHabits)}
          />

          {/* Waktu */}
          <div className="space-y-2">
            <p className="text-sm font-semibold">4. Waktu yang Tersedia Per Hari</p>
            <select
              value={timeAvailable}
              onChange={(e) => setTimeAvailable(e.target.value)}
              className="rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {options.time_options.map((t) => (
                <option key={t} value={t}>
                  {t} Menit{t === 90 ? " atau lebih" : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Tingkat Kesulitan */}
          <div className="space-y-2">
            <p className="text-sm font-semibold">5. Tingkat Kesulitan Aktivitas</p>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {DIFFICULTY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <Button type="submit" disabled={loading} className="rounded-full px-6">
            {loading ? "Memproses..." : "Cari Rekomendasi"}
          </Button>
        </form>

        {/* Error */}
        {error && (
          <div className="mt-8 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Hasil Rekomendasi */}
        {results && (
          <div className="mt-12">
            <h2 className="mb-6 border-b border-white/10 pb-3 text-xl font-bold tracking-tight">
              Hasil Analisis Kesesuaian Aktivitas
            </h2>

            {results.length === 0 ? (
              <p className="text-muted-foreground">
                Tidak ditemukan aktivitas yang cocok dengan kriteria filter tingkat kesulitan.
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                {results.map((item) => (
                  <Card
                    key={item.id}
                    className="border border-white/10 bg-foreground/[0.03]"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground">
                            #{item.rank} &middot; {item.duration_minutes} menit &middot;{" "}
                            <span className="capitalize">{item.difficulty}</span>
                          </p>
                          <CardTitle className="mt-1">{item.title}</CardTitle>
                          <CardDescription className="mt-1">
                            {item.description}
                          </CardDescription>
                        </div>
                        {/* Skor */}
                        <div className="flex shrink-0 flex-col items-center gap-1">
                          <span className="text-2xl font-bold tabular-nums">
                            {item.score}
                          </span>
                          <span className="text-xs text-muted-foreground">/ 100</span>
                        </div>
                      </div>

                      {/* Score bar */}
                      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
                        <div
                          className={`h-full rounded-full transition-all ${SCORE_BAR_COLOR(item.score)}`}
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      {/* Alasan */}
                      <p className="text-sm text-muted-foreground italic">
                        {item.reason}
                      </p>

                      {/* Rincian skor komponen */}
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {Object.entries(item.components).map(([key, val]) => (
                          <div
                            key={key}
                            className="rounded-lg border border-white/10 bg-foreground/[0.03] px-3 py-2 text-center"
                          >
                            <p className="text-xs text-muted-foreground capitalize">{key}</p>
                            <p className="text-sm font-semibold">{val}</p>
                          </div>
                        ))}
                      </div>

                      {/* Tags */}
                      {item.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-white/10 bg-foreground/5 px-2.5 py-0.5 text-xs text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            <p className="mt-6 text-xs text-muted-foreground">
              Catatan: skor menunjukkan kesesuaian (0–100), bukan probabilitas keberhasilan.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

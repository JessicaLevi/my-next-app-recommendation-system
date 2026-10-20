"use client";
import { useState } from "react";
export default function CounterPage() {
  const [count, setCount] = useState(0);
  return (
    <main>
      <h1>Counter</h1>
      <p>Jumlah: {count}</p>
      <div className="flex gap-4">
        <button onClick={() => setCount(count - 1)}> [Kurang] </button>
        <button onClick={() => setCount(count + 1)}> [Tambah] </button>
        <button onClick={() => setCount(0)}> [Reset] </button>
      </div>

    </main>
  );
}

"use client";
import { useEffect } from "react";
export default function EffectPage() {
  useEffect(() => {
    console.log("Component sudah ditampilkan");
  }, []);
  return (
    <main>
      <h1>useEffect Demo</h1>
    </main>
  );
}

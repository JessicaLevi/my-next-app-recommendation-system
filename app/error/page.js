import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default async function ErrorPage({ searchParams }) {
  const { message } = await searchParams;

  return (
    <section className="relative">
      <div className="bg-grid bg-radial-fade absolute inset-0 -z-10" />

      <div className="mx-auto flex max-w-md flex-col items-center px-6 py-32 text-center">
        <AlertTriangle className="size-8 text-destructive" />

        <h1 className="mt-4 text-2xl font-bold tracking-tight">
          Something went wrong
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          {message || "Terjadi kesalahan yang tidak diketahui."}
        </p>

        <Link
          href="/login"
          className="mt-6 text-sm font-medium text-primary hover:underline"
        >
          ← Kembali ke halaman login
        </Link>
      </div>
    </section>
  );
}

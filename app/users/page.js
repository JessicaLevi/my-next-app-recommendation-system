"use client";

import { useEffect, useState } from "react";
import { SearchX } from "lucide-react";

import UserCard from "@/components/UserCard";
import { Input } from "@/components/ui/input";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal mengambil data");
        }

        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (error) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-6 text-center">
          <h2 className="font-semibold text-destructive">
            Something went wrong
          </h2>

          <p className="mt-2 text-sm text-destructive/80">{error}</p>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-6">
        <p className="animate-pulse text-muted-foreground">
          Loading users...
        </p>
      </main>
    );
  }

  return (
    <section className="relative">
      <div className="bg-grid bg-radial-fade absolute inset-0 -z-10" />

      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-primary">Directory</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            User Directory
          </h1>
          <p className="mt-4 text-muted-foreground">
            Browse and search through registered users.
          </p>
        </div>

        <Input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-10 h-10 max-w-sm rounded-full px-4"
        />

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center gap-3 py-16 text-center text-muted-foreground">
              <SearchX className="size-8" />
              <p>User tidak ditemukan.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

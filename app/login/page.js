import { CheckCircle2 } from "lucide-react";

import { login, signup } from "./actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default async function LoginPage({ searchParams }) {
  const { message } = await searchParams;

  return (
    <section className="relative">
      <div className="bg-grid bg-radial-fade absolute inset-0 -z-10" />

      <div className="mx-auto max-w-md px-6 py-20">
        <div className="text-center">
          <p className="text-sm font-semibold text-primary">Account</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            Welcome back
          </h1>
          <p className="mt-4 text-muted-foreground">
            Login untuk melihat daftar favorite kamu, atau buat akun baru.
          </p>
        </div>

        {message && (
          <div className="mt-6 flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/10 px-4 py-3 text-sm text-primary">
            <CheckCircle2 className="size-4 shrink-0" />
            {message}
          </div>
        )}

        <Card className="mt-10 border border-white/10 bg-foreground/[0.03]">
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input id="name" name="name" type="text" placeholder="Nama" />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  formAction={login}
                  className="flex-1 rounded-full"
                >
                  Login
                </Button>

                <Button
                  type="submit"
                  formAction={signup}
                  variant="outline"
                  className="flex-1 rounded-full"
                >
                  Sign Up
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

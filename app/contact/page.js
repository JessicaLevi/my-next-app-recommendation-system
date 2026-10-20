"use client";

import { Mail, MapPin, MessageCircle } from "lucide-react";

import { useUser } from "@/context/UserContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { submitContactForm } from "./actions";

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@mywebsite.com" },
  { icon: MapPin, label: "Location", value: "Jakarta, Indonesia" },
  { icon: MessageCircle, label: "Response time", value: "Within 1-2 days" },
];

export default function Contact() {
  const {
    name,
    email,
    message,
    submitted,
    setName,
    setEmail,
    setMessage,
    setSubmitted,
  } = useUser();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);

    const result = await submitContactForm(formData);

    if (result.success) {
      setSubmitted(true);
    } else {
      alert(result.error);
    }
  }

  return (
    <section className="relative">
      <div className="bg-grid bg-radial-fade absolute inset-0 -z-10" />

      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-primary">Contact</p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            Let&apos;s talk
          </h1>

          <p className="mt-4 text-muted-foreground">
            Have a project or question in mind? Send us a message and
            we&apos;ll get back to you.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-5">
          <div className="space-y-4 md:col-span-2">
            {contactInfo.map(({ icon: Icon, label, value }) => (
              <Card
                key={label}
                className="border border-white/10 bg-foreground/[0.03]"
              >
                <CardContent className="flex items-center gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      {label}
                    </p>

                    <p className="text-sm font-medium">
                      {value}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border border-white/10 bg-foreground/[0.03] md:col-span-3">
            <CardContent>
              {submitted ? (
                <div className="flex h-full min-h-64 flex-col items-center justify-center text-center">
                  <p className="text-lg font-semibold">
                    Message sent
                  </p>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Thanks for reaching out — we&apos;ll reply soon.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium"
                      >
                        Name
                      </label>

                      <Input
                        id="name"
                        placeholder="Your name"
                        required
                        value={name}
                        onChange={(event) =>
                          setName(event.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium"
                      >
                        Email
                      </label>

                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        value={email}
                        onChange={(event) =>
                          setEmail(event.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium"
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      rows={5}
                      required
                      placeholder="Tell us about your project..."
                      value={message}
                      onChange={(event) =>
                        setMessage(event.target.value)
                      }
                      className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full rounded-full"
                  >
                    Send message
                  </Button>
                </form>
              )}

              <div className="mt-6 rounded-lg bg-muted p-4">
                <p>Name: {name}</p>
                <p>Email: {email}</p>
                <p>Message: {message}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
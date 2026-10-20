import { Globe, Mail, MessageCircle } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { value: "20+", label: "Projects" },
  { value: "5+", label: "Years exp." },
  { value: "10+", label: "Clients" },
];

const social = [
  { icon: Mail, label: "Email", href: "mailto:hello@mywebsite.com" },
  { icon: Globe, label: "Website", href: "/" },
  { icon: MessageCircle, label: "Contact", href: "/contact" },
];

export default function Profile() {
  return (
    <section className="relative">
      <div className="bg-grid bg-radial-fade absolute inset-0 -z-10" />

      <div className="mx-auto max-w-3xl px-6 py-20">
        <Card className="border border-white/10 bg-foreground/[0.03]">
          <CardContent className="flex flex-col items-center text-center">
            <div className="flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/40 to-primary/10 text-2xl font-bold">
              MW
            </div>

            <h1 className="mt-4 text-2xl font-bold tracking-tight">
              MyWebsite Team
            </h1>
            <p className="text-sm text-muted-foreground">
              Web &amp; Product Development
            </p>

            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              We build modern, simple, and useful digital experiences for
              individuals and businesses.
            </p>

            <div className="mt-8 grid w-full grid-cols-3 gap-4 border-t border-white/10 pt-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-3">
              {social.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

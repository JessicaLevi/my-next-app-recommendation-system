"use client";

import { Button } from "@/components/ui/button";
import { useFavorite } from "@/context/FavoriteContext";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UserCard({ user }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorite();

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const favorited = isFavorite(user.id);

  return (
    <Card className="group border border-white/10 bg-foreground/[0.03] transition-all hover:-translate-y-1 hover:border-foreground/20 hover:shadow-xl hover:shadow-black/20">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/40 to-primary/10 text-sm font-semibold">
            {initials}
          </div>
          <CardTitle>{user.name}</CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">{user.email}</p>

        <p className="mt-1 text-sm text-muted-foreground">
          {user.company.name}
        </p>

        <div className="mt-4 flex gap-2">
          <Button className="flex-1 rounded-full">View Profile</Button>

          <Button
            variant={favorited ? "default" : "outline"}
            className="rounded-full"
            onClick={() => {
              if (favorited) {
                removeFavorite(user.id);
              } else {
                addFavorite(user);
              }
            }}
          >
            {favorited ? "♥ Favourite" : "♡ Add Favourite"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
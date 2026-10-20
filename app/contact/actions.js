"use server";

import { messages } from "@/lib/db";

export async function submitContactForm(formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  if (!name || !email || !message) {
    return { success: false, error: "Semua field wajib diisi." };
  }

  messages.push({
    id: Date.now(),
    name,
    email,
    message,
    createdAt: new Date().toISOString(),
  });

  return { success: true };
}
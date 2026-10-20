import { getAllFavorites, addFavorite } from "@/lib/services/favoriteService";

export async function GET() {
  return Response.json(await getAllFavorites());
}

export async function POST(request) {
  const body = await request.json();
  const result = await addFavorite(body);

  if (!result.success) {
    return Response.json({ error: result.error }, { status: result.status });
  }

  return Response.json(result.data, { status: result.status });
}
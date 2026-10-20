// app/api/users/[id]/route.js
const users = [
    { id: 1, name: "Leanne Graham", email: "leanne@example.com" },
    { id: 2, name: "Ervin Howell", email: "ervin@example.com" },
    { id: 3, name: "Clementine Bauch", email: "clementine@example.com" }
];

export async function GET(request, { params }) {
    const { id } = await params;
    const user = users.find((u) => u.id === Number(id));

    if (!user) {
        return Response.json({ error: "User tidak ditemukan" }, { status: 404 });
    }

    return Response.json(user);
}
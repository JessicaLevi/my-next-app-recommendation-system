const users = [
    {
        id: 1,
        name: "Leanne Graham",
        email: "leanne@example.com"
    },
    {
        id: 2,
        name: "Ervin Howell",
        email: "ervin@example.com"
    },
    {
        id: 3,
        name: "Clementine Bauch",
        email: "clementine@example.com"
    }
];

export async function GET() {
    return Response.json(users);
}
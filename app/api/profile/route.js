const users = [
    {
        name: "Nur Indah Pratiwi",
        role: "Instruktur Bootcamp Perempuan Inovasi 2025",
        favoriteTech: ["HTML", "CSS", "JavaScript", "React", "Next.js"],
    }
];

export async function GET() {
    return Response.json(users);
}
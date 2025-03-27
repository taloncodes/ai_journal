import { connectToDB } from "$lib/db";

export async function POST({ request, cookies }) {
  const userId = cookies.get('userId');
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorised' }), { status: 401 });
  }

  const { date } = await request.json();

  const db = await connectToDB();
  const collection = db.collection('entries');

  const selectedDate = new Date(date);

  const entries = await collection
    .find({ userId, createdAt: selectedDate })
    .toArray();

  return new Response(JSON.stringify({ entries }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

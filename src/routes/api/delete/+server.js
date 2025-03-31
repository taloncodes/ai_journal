import { connectToDB } from "$lib/db";

export async function POST({ request, cookies }){

    console.log('endpoint hit', await request);
    const userId = cookies.get('userId');

    if (!userId){
        return new Response(JSON.stringify({ error: 'Unauthorised' }), { status: 401 });
    }

    const body = await request.json();
    const { selectedDate } = body;
    console.log('date: ', selectedDate);

    const db = await connectToDB();
    const collection = db.collection('entries');

    await collection.deleteOne(
        { userId: userId, createdAt: new Date(selectedDate) }
    );

    return new Response('success', {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });

}
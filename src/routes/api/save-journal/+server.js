import { connectToDB } from "$lib/db";

export async function POST({request, cookies}) {
    const userId = cookies.get('userId');
    console.log('endpoint hit');

    if (!userId) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const { gratitude, challenge, reflection, feeling, aiResponse } = await request.json();

    const db = await connectToDB();
    const collection = db.collection('entries');

    await collection.insertOne({
        userId,
        gratitude,
        challenge,
        reflection,
        feeling,
        aiResponse,
        createdAt: new Date(new Date().toISOString().split('T')[0])

    });

    return new Response(JSON.stringify({ success: true}), {
        status: 200,
        headers: {'Content-Type': 'application/json'}
    });

}
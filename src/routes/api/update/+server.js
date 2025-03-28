import { connectToDB } from "$lib/db";

export async function POST({request, cookies}) {
    const userId = cookies.get('userId');
    console.log('endpoint hit');
    

    if (!userId) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }


    const body = await request.json();
    const { review, selectedDate } = body;

    console.log(await body);

    //handle function here
    const db = await connectToDB();
    const collection = db.collection('entries');


    await collection.updateOne(
        { userId: userId, createdAt: new Date(selectedDate) },
        { $set: { review: review } }
    );

    return new Response(JSON.stringify({ success: true}), {
        status: 200,
        headers: {'Content-Type': 'application/json'}
    });

}
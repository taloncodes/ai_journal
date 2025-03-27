import { redirect } from '@sveltejs/kit';
import { connectToDB } from '$lib/db';

export async function load({ cookies }) {
  const userId = cookies.get('userId');
  if (!userId) {
    throw redirect(303, '/login');
  }

  const db = await connectToDB();
  const collection = db.collection('entries');

  const today = new Date(new Date().toISOString().split('T')[0]);

  const existingEntry = await collection.findOne({
    userId: userId,
    createdAt: today
  });

  if (existingEntry){
    existingEntry._id = existingEntry._id.toString();
  }

  return {
    userId,
    alreadySubmitted: Boolean(existingEntry),
    entry: existingEntry || null
  };
}

import { fail, redirect } from '@sveltejs/kit';
import { connectToDB } from '$lib/db.js';
import bcrypt from 'bcryptjs';

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
      return fail(400, { error: 'Email and password are required' });
    }

    const db = await connectToDB();
    const users = db.collection('users');

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return fail(400, { error: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await users.insertOne({
      email,
      passwordHash,
      createdAt: new Date()
    });

    // Redirect to login or journal page
    throw redirect(303, '/login');
  }
};

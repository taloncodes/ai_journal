import { fail, redirect } from '@sveltejs/kit';
import { connectToDB } from '$lib/db.js';
import bcrypt from 'bcryptjs';

export const actions = {
  default: async ({ request, cookies }) => {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
      return fail(400, { error: 'Missing email or password' } );
    }

    const db = await connectToDB();
    const users = db.collection('users');

    const user = await users.findOne({ email });
    if (!user) {
      return fail(400, { error: 'No user found with that email' } );
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return fail(400, { error: 'Incorrect password' } );
    }

    //Temporary
    cookies.set('userId', user._id.toString(), {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });

    // Redirect to journal on succesful login
    throw redirect(303, '/journal');
  }
};

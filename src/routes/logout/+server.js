import { redirect } from '@sveltejs/kit';

export function GET({ cookies }) {

  cookies.set('userId', '', {
    path: '/',
    expires: new Date(0)
  });

  throw redirect(303, '/login');
}

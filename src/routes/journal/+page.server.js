import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {

  const userId = cookies.get('userId');
  console.log(cookies.get('userId'));

  if (!userId){
    throw redirect(303, '/login');
  }

  return{userId};
}
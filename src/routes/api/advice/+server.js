
import { OPENROUTER_API_KEY } from '$env/static/private';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = OPENROUTER_API_KEY


export async function POST({ request }) {
    const { prompt } = await request.json();
  
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1-0528:free',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });
  
    const data = await response.json();
    console.log(data);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
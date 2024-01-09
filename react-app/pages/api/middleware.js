// pages/api/middleware.js
import { NextResponse } from 'next/server';
import { get } from '@vercel/edge-config';

export const config = { matcher: '/welcome' };

export async function middleware() {
  const greeting = await get('greeting');
  // NextResponse.json requires at least Next v13.1 or
  // enabling experimental.allowMiddlewareResponseBody in next.config.js
  return NextResponse.json(greeting);
}



export default function middleware(req, res) {
  // Your middleware logic here
  console.log('Middleware executed!');
  res.status(200).json({ message: 'Middleware executed!' });
}

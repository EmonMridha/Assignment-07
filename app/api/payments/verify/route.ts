import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return NextResponse.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }

  const body = await request.json();

  const backendRes = await fetch(
    `${process.env.BACKEND_API_URL}/api/v1/payment/verify`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    }
  );

  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}
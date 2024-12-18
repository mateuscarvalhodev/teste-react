import { cookies } from 'next/headers';

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete('accessToken').delete('refreshToken')
  return Response.json({redirectTo: '/'})
}
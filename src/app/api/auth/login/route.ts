import { cookies } from "next/headers"
type RequsetPayloadType = {
  username:string,
  password: string
}
export async function POST (request: Request) {
  const cookieStore = cookies()
  const data: RequsetPayloadType = await request.json()
  if(data.username ==='admin' && data.password === 'admin'){
    (await cookieStore).set('token', 'aaaaaaaaaaaaaaaaaaaa')
    return Response.json({ redirectTo: '/dashboard' })
  }
  return Response.json('Credenciais invalidas', {status: 403})
}
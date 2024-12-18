import { cookies } from 'next/headers';
import { LoginPayloadType } from '@/types/auth/authPayloadTypes';
import { LoginResponseType } from '@/types/auth/authResponseTypes';
import axios,{ AxiosError } from 'axios';

export async function POST(request: Request) {
  const cookieStore = await cookies();
  let loginPayload: LoginPayloadType;

  try {
    loginPayload = await request.json();
    if (!loginPayload.username || !loginPayload.password) {
      return Response.json(
        { message: 'Dados de login inválidos' },
        { status: 400 }
      );
    }
  } catch {
    return Response.json(
      { message: 'Payload inválido ou mal formatado' },
      { status: 400 }
    );
  }

  try {
    console.log(loginPayload)
    const { data } = await axios.post<LoginResponseType>(
      'https://dummyjson.com/auth/login',
      loginPayload
    );

    cookieStore.set('accessToken', data.accessToken, { httpOnly: true });
    cookieStore.set('refreshToken', data.refreshToken, { httpOnly: true });

    return Response.json(
      { ...data, redirectTo: '/dashboard' },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 400) {
        return Response.json(
          { message: 'Credenciais inválidas' },
          { status: 400 }
        );
      }

      return Response.json(
        { message: error.response?.data?.message || 'Erro ao fazer login' },
        { status: error.response?.status || 500 }
      );
    }

    console.error('Erro inesperado ao fazer login:', error);
    return Response.json(
      { message: 'Ocorreu um erro interno no servidor' },
      { status: 500 }
    );
  }
}

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import FloatingInput from '@/components/FloatInput';
import axios, { AxiosError } from 'axios';
import { LoginPayloadType } from '@/types/auth/authPayloadTypes'
import { LoginResponseType } from '@/types/auth/authResponseTypes'

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError('');
    setUsernameError(false);
    setPasswordError(false);

    if (!username.trim() || !password.trim()) {
      setUsernameError(!username.trim());
      setPasswordError(!password.trim());
      setFormError('Login e senha são obrigatórios.');
      setIsLoading(false);
      return;
    }
    console.log('Username:', username, 'Password:', password);
    const payload: LoginPayloadType = {
      username,
      password
    }
    try {
      const res = await axios.post<LoginResponseType>('/api/auth/login', payload);

      if (res.status === 200 && res.data.redirectTo) {
        router.push(res.data.redirectTo);
      } else {
        setFormError('Erro inesperado. Tente novamente.');
      }
    } catch (error) {
      console.error(error)
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || 'Erro ao realizar login.';
        setFormError(errorMessage);
      } else {
        setFormError('Erro desconhecido. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col w-full max-w-sm text-black'>
      <h1 className='mb-8 text-lg font-semibold text-center md:text-left'>
        Logue com sua conta
      </h1>
      <form onSubmit={handleLogin}>
        <div className='flex flex-col mb-4'>

          <FloatingInput
            label='Login'
            id='username'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={usernameError}
          />

        </div>
        <div className='flex flex-col mb-6'>
          <FloatingInput
            label='Senha'
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
          />

        </div>
        <button
          className='w-full px-3 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-800 disabled:opacity-50'
          type='submit'
          disabled={isLoading}
        >
          {isLoading ? 'Fazendo login...' : 'Login'}
        </button>

        {formError && (
          <div className='h-4'>
            <p className='text-red-500 text-sm mt-4 text-center'>{formError}</p>
          </div>
        )}
      </form>
    </div>
  );
};
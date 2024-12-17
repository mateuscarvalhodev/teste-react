import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import FloatingInput from '@/components/FloatInput';
import axios, { AxiosError } from 'axios';

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
      if (!username.trim()) {
        setUsernameError(true);
      }
      if (!password.trim()) {
        setPasswordError(true);
      }
      setFormError('Login e senha são obrigatórios.');
      setIsLoading(false);
      return;
    }
    try {
      const res = await axios.post('/api/auth/login', {
        username,
        password
      })
      router.push(res.data.redirectTo)
      console.log(res)
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        setFormError(error.response.data)

      } else {
        setFormError('Ocorreu um erro inesperado')
      }

    }

    setIsLoading(false);
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
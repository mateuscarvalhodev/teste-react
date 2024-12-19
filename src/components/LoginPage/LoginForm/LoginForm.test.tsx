import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { LoginForm } from '.';
import { FloatingInputProps } from '@/types/floatingInputTypes';

jest.mock('@/components/FloatInput', () => ({
  __esModule: true,
  default: ({ id, label, type, value, onChange, error }: FloatingInputProps) => (
    <div>
      <input
        aria-label={label}
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        data-error={error}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  ),
}));

jest.mock('axios');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('LoginForm Component', () => {
  const mockPush = jest.fn();
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('renders the form with all inputs and the login button', () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/login/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('shows error when fields are empty and form is submitted', async () => {
    render(<LoginForm />);

    userEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(await screen.findByText(/login e senha são obrigatórios/i)).toBeInTheDocument();
  });

  it('submits the form and redirects on successful login', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      status: 200,
      data: { redirectTo: '/dashboard' },
    });

    render(<LoginForm />);
    const usernameInput = screen.getByLabelText(/login/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    await userEvent.type(usernameInput, 'emilys');
    await userEvent.type(passwordInput, 'emilyspass');
    expect(usernameInput).toHaveValue('emilys');
    expect(passwordInput).toHaveValue('emilyspass');

    userEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() =>
      expect(mockedAxios.post).toHaveBeenCalledWith('/api/auth/login', {
        username: 'emilys',
        password: 'emilyspass',
      })
    );

    expect(mockPush).toHaveBeenCalledWith('/dashboard');
  });
});
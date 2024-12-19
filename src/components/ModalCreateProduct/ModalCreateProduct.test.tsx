import { render, screen, fireEvent, act } from '@testing-library/react';
import ModalForm from '.';
import { ToastProvider } from '../ui/toast';

jest.mock('@/services/axiosinstance');

describe('ModalForm Component', () => {
  const mockOnClose = jest.fn();
  const mockSetProductsState = jest.fn();

  const renderModalForm = (open = true) =>
    render(
      <ToastProvider>
        <ModalForm open={open} onClose={mockOnClose} setProductsState={mockSetProductsState} />
      </ToastProvider>
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when open', () => {
    renderModalForm();

    expect(screen.getByText(/adicionar novo produto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/preço/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/brand/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    renderModalForm(false);

    expect(screen.queryByText(/adicionar novo produto/i)).not.toBeInTheDocument();
  });

  it('displays error messages when required fields are missing', async () => {
    renderModalForm();

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /salvar/i }));
    });

    const errorMessages = await screen.findAllByText(/título é obrigatório/i);
    expect(errorMessages.length).toBeGreaterThan(0);
  });
});
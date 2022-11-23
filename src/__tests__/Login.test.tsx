import Login from '../components/Login';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Login Component', () => {
  it('contains the proper html', () => {
    render(<Login />);
    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Password')).toBeInTheDocument();
    expect(
      screen.queryByPlaceholderText('Confirm Password')
    ).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  it('calls the onChange function on user type events', () => {
    render(<Login></Login>);
    const usernameInput = screen.getByPlaceholderText(/Username/i);
    const passwordInput = screen.getByPlaceholderText('Enter Password');
    userEvent.type(usernameInput, 'testuser');
    userEvent.type(passwordInput, 'testpass');
    expect(usernameInput).toHaveValue('testuser');
    expect(passwordInput).toHaveValue('testpass');
  });

  it('renders error on incorrect login', async () => {
    render(<Login></Login>);
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.reject({ status: 404 }),
      })
    ) as jest.Mock;
    const button = screen.getByRole('button', { name: 'Login' });
    userEvent.click(button);
    await waitFor(() => {
      expect(
        screen.getByText('Incorrect Login Credentials')
      ).toBeInTheDocument();
    });
  });

  it('renders signup on create account button click', () => {
    render(<Login></Login>);
    const button = screen.getByRole('button', { name: 'Create New Account' });
    expect(
      screen.queryByRole('heading', { name: 'Signup' })
    ).not.toBeInTheDocument();
    userEvent.click(button);
    expect(screen.getByRole('heading', { name: 'Signup' })).toBeInTheDocument();
  });
});

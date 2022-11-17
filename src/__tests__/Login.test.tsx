import Login from '../components/Login';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Signup Component', () => {
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
});

import React from 'react';
import Signup from '../components/Signup';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Signup Component', () => {
  it('contains the proper html', () => {
    render(<Signup />);
    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create/i })).toBeInTheDocument();
  });

  it('calls the onChange function on user type events', () => {
    render(<Signup></Signup>);
    const usernameInput = screen.getByPlaceholderText(/Username/i);
    const passwordInput = screen.getByPlaceholderText('Enter Password');
    const confirmPasswordInput =
      screen.getByPlaceholderText('Confirm Password');
    userEvent.type(usernameInput, 'testuser');
    userEvent.type(passwordInput, 'testpass');
    userEvent.type(confirmPasswordInput, 'testpass');
    expect(usernameInput).toHaveValue('testuser');
    expect(passwordInput).toHaveValue('testpass');
    expect(confirmPasswordInput).toHaveValue('testpass');
  });

  it('returns error on submit failure', async () => {
    const error = 'woosh';
    render(<Signup></Signup>);
    global.fetch = jest.fn().mockRejectedValue(error);

    const button = screen.getByRole('button');
    userEvent.click(button);
    await waitFor(() => {
      expect(
        screen.getByText('Oops... something went wrong')
      ).toBeInTheDocument();
    });
    return expect(fetch).toHaveBeenCalled();
  });
});

import React from 'react';
import Signup from '../components/Signup';
import { render, screen } from '@testing-library/react';

describe('Signup Component', () => {
  it('contains the proper html', () => {
    render(<Signup />);
    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create/i })).toBeInTheDocument();
  });
});

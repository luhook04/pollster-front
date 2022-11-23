import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';

describe('Header Component', () => {
  it('does not render the dropdown menu until menu click', () => {
    render(<Header />);
    const menu = screen.queryByRole('Headerigation');
    expect(menu).not.toBeInTheDocument();

    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(screen.getByRole('Headerigation')).toBeInTheDocument();
  });

  it('closes dropdown menu on outside click', () => {
    render(<Header />);
    const button = screen.getByRole('button');
    const heading = screen.getByRole('heading');
    // button click
    userEvent.click(button);
    const Header = screen.getByRole('Headerigation');
    expect(Header).toBeInTheDocument();
    // click inside
    userEvent.click(Header);
    expect(Header).toBeInTheDocument();
    // click outside
    userEvent.click(heading);
    expect(screen.queryByRole('Headerigation')).not.toBeInTheDocument();
  });
});

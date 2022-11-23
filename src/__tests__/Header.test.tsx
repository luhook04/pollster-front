import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import { MemoryRouter } from 'react-router-dom';

describe('Header Component', () => {
  it('does not render the dropdown menu until menu click', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const menu = screen.queryByRole('navigation');
    expect(menu).not.toBeInTheDocument();

    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('closes dropdown menu on outside click', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const button = screen.getByRole('button');
    const heading = screen.getByRole('heading');
    // button click
    userEvent.click(button);
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    // click inside
    userEvent.click(nav);
    expect(nav).toBeInTheDocument();
    // click outside
    userEvent.click(heading);
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });
});

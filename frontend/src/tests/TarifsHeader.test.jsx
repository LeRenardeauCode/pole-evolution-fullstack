import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import TarifsHeader from '../components/Tarifs/TarifsHeader.jsx';

describe('TarifsHeader', () => {
  it('renders the main title', () => {
    render(<TarifsHeader />);
    expect(screen.getByText(/les tarifs/i)).toBeInTheDocument();
  });
});

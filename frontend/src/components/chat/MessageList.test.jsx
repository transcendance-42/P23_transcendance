import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import MessageList from './MessageList';

vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key) => key }) }));
vi.mock('./MessageBubble', () => ({
  default: ({ text }) => <span>{text}</span>,
}));

describe('MessageList', () => {
  it('affiche un état vide', () => {
    render(<MessageList messages={[]} userId={1} />);
    expect(screen.getByText('StartConv')).toBeInTheDocument();
  });

  it('affiche les messages', () => {
    render(<MessageList messages={[{
      id: 1,
      content: 'Bonjour',
      sender_id: 1,
      users: { first_name: 'Alice' },
    }]} userId={1} />);
    expect(screen.getByText('Bonjour')).toBeInTheDocument();
  });
});

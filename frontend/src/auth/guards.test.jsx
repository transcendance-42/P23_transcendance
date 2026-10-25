import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import RequireAuth from './RequireAuth';
import RequireAdmin from './RequireAdmin';
import RequireProfileComplete from './profileComplete';

vi.mock('./AuthContext', () => ({ useAuth: vi.fn() }));
vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key) => key }) }));

import { useAuth } from './AuthContext';

function renderGuard(element, initialEntries = ['/current']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/current" element={element} />
        <Route path="/profile" element={<p>profile-page</p>} />
        <Route path="/" element={<p>landing-page</p>} />
        <Route path="/login" element={<p>login-page</p>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('RequireAuth', () => {
  it('affiche le chargement', () => {
    useAuth.mockReturnValue({ loading: true, token: null, waitInSeconds: 0 });
    renderGuard(<RequireAuth><p>private</p></RequireAuth>);
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('affiche les enfants avec un token', () => {
    useAuth.mockReturnValue({ loading: false, token: 'token', waitInSeconds: 0 });
    renderGuard(<RequireAuth><p>private</p></RequireAuth>);
    expect(screen.getByText('private')).toBeInTheDocument();
  });
});

describe('RequireAdmin', () => {
  it('affiche les enfants à un admin', () => {
    useAuth.mockReturnValue({ user: { role: 'admin' } });
    renderGuard(<RequireAdmin><p>admin</p></RequireAdmin>);
    expect(screen.getByText('admin')).toBeInTheDocument();
  });

  it('redirige un utilisateur standard vers le profil', () => {
    useAuth.mockReturnValue({ user: { role: 'user' } });
    renderGuard(<RequireAdmin><p>admin</p></RequireAdmin>);
    expect(screen.getByText('profile-page')).toBeInTheDocument();
  });
});

describe('RequireProfileComplete', () => {
  it('redirige un profil incomplet au lieu de rendre la page', () => {
    useAuth.mockReturnValue({
      user: { first_name: 'Alice', dogs: null },
      loading: false,
    });
    renderGuard(<RequireProfileComplete><p>complete</p></RequireProfileComplete>);
    expect(screen.queryByText('complete')).not.toBeInTheDocument();
  });
});

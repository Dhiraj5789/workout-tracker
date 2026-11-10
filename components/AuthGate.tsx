'use client';

import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { getSupabase } from '@/lib/supabase';

type Mode = 'signin' | 'signup';

/** Shows an email + password form until there is a session, then renders children. */
export function AuthGate({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null | undefined>(undefined); // undefined = checking
  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const supabase = getSupabase();
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => data.subscription.unsubscribe();
  }, []);

  if (session === undefined) return <main><p className="mu">Loading…</p></main>;

  if (session) {
    return (
      <>
        <button className="signout" onClick={() => getSupabase().auth.signOut()}>Sign out</button>
        {children}
      </>
    );
  }

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage('');
    setBusy(true);
    const { auth } = getSupabase();
    const { data, error } =
      mode === 'signin'
        ? await auth.signInWithPassword({ email, password })
        : await auth.signUp({ email, password });
    setBusy(false);
    if (error) setMessage(error.message);
    else if (mode === 'signup' && !data.session) {
      setMessage('Account created, but email confirmation is still on in Supabase. Turn off "Confirm email" and try again.');
    } // on success the auth listener above sets the session
  };

  return (
    <main>
      <h1>{mode === 'signin' ? 'Sign in' : 'Create account'}</h1>
      <form className="card" onSubmit={submit}>
        <label htmlFor="email">Email</label>
        <div className="g">
          <input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <label htmlFor="password" style={{ marginTop: 10 }}>Password (8+ characters)</label>
        <div className="g">
          <input
            id="password"
            type="password"
            autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
            minLength={8}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="pri" type="submit" disabled={busy}>
          {mode === 'signin' ? 'Sign in' : 'Create account'}
        </button>
        {message && <p className="mu">{message}</p>}
        <p className="mu">
          <a href="#" onClick={(e) => { e.preventDefault(); setMessage(''); setMode(mode === 'signin' ? 'signup' : 'signin'); }}>
            {mode === 'signin' ? 'No account? Create one' : 'Have an account? Sign in'}
          </a>
        </p>
      </form>
    </main>
  );
}

import { Title } from '@tremor/react';
import { signIn, signOut } from 'next-auth/react';

export default async function IndexPage({}: {}) {

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Sign In</Title>
      <button onClick={() => signIn('github')}>
        Sign in
      </button>
    </main>
  );
}
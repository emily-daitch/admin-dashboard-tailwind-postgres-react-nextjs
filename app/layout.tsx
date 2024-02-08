import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import Nav from './nav';
import Toast from './toast';
import { Suspense } from 'react';
import { auth } from './auth';
import { sql } from '@vercel/postgres';

export const metadata = {
  title: 'Next.js App Router + NextAuth + Tailwind CSS',
  description:
    'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, ESLint, and Prettier.'
};

interface User {
  id: string;
  email: string;
  username: string;
  name: string;
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if(session && session.user) {
    console.log('session from layout', session);
    const logResult = await sql`
    SELECT id, email, username
    FROM users 
    WHERE email ILIKE  ${session.user.email}
    `;
    const user = logResult.rows as User[];

    if(!user[0]) {
      console.log('creating new user');
      const userInsertResult = await sql`
      INSERT INTO users(name, email, username)
      VALUES (${session.user.name}, ${session.user.email}, 'testusername2');
      `;
      const newUser = userInsertResult.rows as User[];
      console.log('new user', newUser);
    }
  }
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Suspense>
          <Nav />
        </Suspense>
        {children}
        <Analytics />
        <Toast />
      </body>
    </html>
  );
}

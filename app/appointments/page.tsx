import { sql } from '@vercel/postgres';
import { Card, Title, Text } from '@tremor/react';
import Search from '../search';
import AppointmentTable from '../aptTable';
import BasicEditingGrid from '../editGrid';
import {
  GridRowId,
} from '@mui/x-data-grid';

interface Appointment {
  id: number;
  description: string;
  lastVisit: Date;
  nextVisit: Date;
}

interface User {
  name: string;
  email: string;
  id: GridRowId;
  username: string;
}

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  console.log('searchParams', searchParams);
  const search = searchParams.q ?? '';
  const result = await sql`
    SELECT id, description, lastVisit, nextVisit 
    FROM appointments 
    WHERE description ILIKE ${'%' + search + '%'};
  `;
  const appointments = result.rows as Appointment[];

  const resultUsers = searchParams.q ? await sql`
  SELECT id, name, username, email 
  FROM users 
  WHERE name ILIKE ${'%' + search + '%'};
  ` : await sql`
  SELECT id, name, username, email 
  FROM users;
  `;
  const users = resultUsers.rows as User[];
  console.log('users', users);
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Users</Title>
      <Text>A list of users retrieved from a Postgres database.</Text>
      <Search />
      {/* <Card className="mt-6">
        <AppointmentTable appointments={appointments} />
      </Card> */}
      <BasicEditingGrid users={users}></BasicEditingGrid>
    </main>
  );
}
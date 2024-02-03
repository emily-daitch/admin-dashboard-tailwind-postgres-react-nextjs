import { sql } from '@vercel/postgres';
import { Card, Title, Text } from '@tremor/react';
import Search from '../search';
import AppointmentTable from '../aptTable';
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

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Appointments</Title>
      <Text>A list of appointments retrieved from a Postgres database.</Text>
      <Search />
      <Card className="mt-6">
        <AppointmentTable appointments={appointments} />
      </Card>
    </main>
  );
}
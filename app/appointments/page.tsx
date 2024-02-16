import { Card, Title, Text } from '@tremor/react';
import Search from '../search';
import AppointmentTable from '../aptTable';
import {
  GridRowId,
} from '@mui/x-data-grid';
import { Appointment, AppointmentGroup } from '../interfaces';
import { unstable_noStore as noStore } from 'next/cache';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
noStore();
const getAppointments = async () => {
  
  let url = 'https://admin-dashboard-tailwind-postgres-react-nextjs-ruby-eta.vercel.app/api/appointments?';

      return new Promise<AppointmentGroup>(async (resolve, reject) => {
        const appointmentsResponse = await fetch(url);
        const appointments = await appointmentsResponse.json();
        console.log('appointments from apt page', appointments);
        if(!appointments) {
          reject(new Error("Error getting users."));
        } else {
          resolve({ ...appointments})
        }
      })
};

  const appointments = await getAppointments() as AppointmentGroup;
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Appointments</Title>
      <Text>A list of appointments retrieved from a Postgres database.</Text>
      <Search />
      <Card className="mt-6">
        <AppointmentTable appointments={appointments.appointments} />
      </Card>
    </main>
  );
}
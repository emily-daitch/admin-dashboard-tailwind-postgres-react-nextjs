import { Title, Text } from '@tremor/react';
import BasicEditingGrid from '../../appointmentEditGrid';
import { unstable_noStore as noStore } from 'next/cache';
import { AppointmentGroup } from '../../interfaces';

export default async function ManageAppointments({
  searchParams
} : {
  searchParams: { q: string };
}) {

  noStore();
  const getAppointments = async (search: string) => {
    let params: {[key: string]: string} = { // define params as an indexable type
      "search": search,
    };
    
    let query = Object.keys(params)
                 .map(k => 
                  {
                    console.log('encoded k', encodeURIComponent(k), 'param', encodeURIComponent(params[k]));
                    console.log('k', k, 'p', params[k]);
                    return encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
                  })
                 .join('&');
    
    let url = 'https://admin-dashboard-tailwind-postgres-react-nextjs-ruby-eta.vercel.app/api/appointments?' + query;
    console.log('URL', url);

        return new Promise<AppointmentGroup>(async (resolve, reject) => {
          const appointmentsResponse = await fetch(url);
          const appointments = await appointmentsResponse.json();
          console.log('appointments from manage page', appointments);
          if(!appointments) {
            reject(new Error("Error getting appointments."));
          } else {
            resolve({ ...appointments})
          }
        })
  };
  console.log('searchParams', searchParams);
  const search = searchParams.q ?? '';

  const appointmentsTest = await getAppointments(search) as AppointmentGroup;
  console.log('awaited appointments from management page', appointmentsTest);

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Appointments</Title>
      <Text>Manage Daily Appointments</Text>
      <BasicEditingGrid rowsProp={appointmentsTest.appointments}></BasicEditingGrid>
    </main>
  );
}
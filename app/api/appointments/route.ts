import { sql } from '@vercel/postgres';
import { NextRequest } from 'next/server'
import { Appointment } from '../../interfaces';

type ResponseData = {
  message: string
  body: string | undefined
}

let getAppointments = async function(search: string) {
  const result = search === '' ? await sql`SELECT * FROM appointments` : await sql`
  SELECT id, taskorder, title, description, username 
  FROM appointments 
  WHERE title ILIKE ${'%' + search + '%'};`;
  const appointments = result.rows as Appointment[];
  return appointments;
};

let updateAppointments = async function(appointment: Partial<Appointment>) {
  console.log('appointment to update from update appointment', appointment);
  const result = await sql`UPDATE dailytask SET description = ${appointment.description}
  WHERE id = ${appointment.id}
  RETURNING *;`;
  const appointments = result.rows as Appointment[];
  // should only return updated task, not bulk update... TODO
  console.log('result from update appointment', result);
  console.log('appointments from update appointment', appointments);
  return appointments;
};

export async function GET(
  req: NextRequest
) {
    console.log('request from appointments get', req);
    //let parsedRequest = await req.json();
    let search = req.nextUrl.searchParams.get('search') || '';
    console.log('get search', search);
    let appointments = await getAppointments(search);
    console.log('appointments from GET', appointments);
    return Response.json({appointments});
}

export async function POST(
  req: Request
) {
    if(req.body) {
      let parsedBody = await req.json();
      console.log('post appointment', parsedBody);
      let updatedAppointment = await updateAppointments(parsedBody);
      return Response.json({appointment: updatedAppointment});
    }
}
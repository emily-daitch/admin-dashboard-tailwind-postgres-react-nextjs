import { sql } from '@vercel/postgres';
import { NextRequest } from 'next/server'
import { Appointment } from '../../interfaces';

type ResponseData = {
  message: string
  body: string | undefined
}

let getAppointments = async function(search: string) {
  const result = search === '' ? await sql`SELECT * FROM appointments` : await sql`
  SELECT id, description, lastVisit, nextVisit
  FROM appointments 
  WHERE description ILIKE ${'%' + search + '%'};`;
  const appointments = result.rows as Appointment[];
  return appointments;
};

let updateAppointments = async function(appointment: Partial<Appointment>) {
  console.log('appointment to update from update appointment', appointment);
  // const result = await sql`UPDATE appointments SET description = ${appointment.description}
  // WHERE description = ${appointment.description}
  // RETURNING *;`;
  const result = await sql`INSERT INTO appointments (id, description, lastVisit, nextVisit)
  VALUES (${appointment.id}, ${appointment.description}, ${appointment.lastVisit?.getTime() || null}, ${appointment.nextVisit?.getTime() || null})
  ON CONFLICT (id)
  DO UPDATE SET description = ${appointment.description}, lastVisit = ${appointment.lastVisit?.getTime() || null}, nextVisit = ${appointment.nextVisit?.getTime() || null}
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
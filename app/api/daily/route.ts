import { sql } from '@vercel/postgres';
import { NextRequest } from 'next/server'

type ResponseData = {
  message: string
  body: string | undefined
}

interface User {
  name: string;
  email: string;
  id: number | string;
  username: string;
}

let getDailyTasks = async function(search: string) {
  const result = search === '' ? await sql`SELECT * FROM dailytask` : await sql`
  SELECT id, taskorder, title, description, username 
  FROM dailytask 
  WHERE title ILIKE ${'%' + search + '%'};`;
  const tasks = result.rows as User[];
  return tasks;
};

export async function GET(
  req: NextRequest
) {
    console.log('request from users get', req);
    //let parsedRequest = await req.json();
    let search = req.nextUrl.searchParams.get('search') || '';
    console.log('get search', search);
    let tasks = await getDailyTasks(search);
    console.log('tasks from GET', tasks);
    return Response.json({tasks});
}
import { sql } from '@vercel/postgres';
import { NextRequest } from 'next/server'

type ResponseData = {
  message: string
  body: string | undefined
}

interface DailyTask {
  taskorder: string;
  title: string;
  description: string;
  id: number | string;
  username: string;
}

let getDailyTasks = async function(search: string) {
  const result = search === '' ? await sql`SELECT * FROM dailytask` : await sql`
  SELECT id, taskorder, title, description, username 
  FROM dailytask 
  WHERE title ILIKE ${'%' + search + '%'};`;
  const tasks = result.rows as DailyTask[];
  return tasks;
};

let updateDailyTasks = async function(task: Partial<DailyTask>) {
  console.log('task to update from update task', task);
  const result = await sql`UPDATE dailytask SET taskorder = ${task.taskorder},
  title = ${task.title},
  description = ${task.description}
  WHERE id = ${task.id}
  RETURNING *;`;
  const tasks = result.rows as DailyTask[];
  // should only return updated task, not bulk update... TODO
  console.log('result from update task', result);
  console.log('tasks from update task', tasks);
  return tasks;
};

export async function GET(
  req: NextRequest
) {
    console.log('request from tasks get', req);
    //let parsedRequest = await req.json();
    let search = req.nextUrl.searchParams.get('search') || '';
    console.log('get search', search);
    let tasks = await getDailyTasks(search);
    console.log('tasks from GET', tasks);
    return Response.json({tasks});
}

export async function POST(
  req: Request
) {
    if(req.body) {
      let parsedBody = await req.json();
      console.log('post task', parsedBody);
      let updatedTask = await updateDailyTasks(parsedBody);
      return Response.json({user: updatedTask});
    }
}
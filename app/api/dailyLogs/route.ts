import { sql } from '@vercel/postgres';
import { NextRequest } from 'next/server'
import { DailyLog, User } from '../../interfaces';
import { auth } from '../../auth';

type ResponseData = {
  message: string
  body: string | undefined
}

let getDailyTaskLogs = async function(username: string) {
  const result = await sql`
  SELECT id, taskid, title, description, day, done, username 
  FROM dailylog 
  WHERE username = ${username}
  AND day = CURRENT_DATE;`;
  const logs = result.rows as DailyLog[];
  return logs;
};

let updateDailyLogs = async function(log: Partial<DailyLog>) {
  const result = await sql`INSERT INTO dailylog(day, title, done, username, description, taskid)
                                          VALUES(${Date.now()},
                                                 ${log.title},
                                                 ${log.done},
                                                 ${log.username},
                                                 ${log.description},
                                                 ${log.taskid})
                                          RETURNING *;`;
  const logs = result.rows as DailyLog[];

  return logs;
};

let getUser = async function(email: string) {
  const result = await sql`
  SELECT username 
  FROM users 
  WHERE email ILIKE ${'%' + email + '%'};`;
  const users = result.rows as User[];
  return users;
};

export async function GET(
  req: NextRequest
) {
    console.log('request from logs get', req);
    //let parsedRequest = await req.json();
    const session = await auth();
    let user = await getUser(session?.user?.email || '')

    let username = user[0].username;
    console.log('get username', username);
    let logs = await getDailyTaskLogs(username);
    console.log('logs from GET', logs);
    return Response.json({logs});
}

export async function POST(
  req: Request
) {
    if(req.body) {
      let parsedBody = await req.json();
      console.log('post log', parsedBody);
      let updatedLog = await updateDailyLogs(parsedBody);
      return Response.json({log: updatedLog});
    }
}
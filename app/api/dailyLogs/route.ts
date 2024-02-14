import { sql } from '@vercel/postgres';
import { NextRequest } from 'next/server'
import { DailyLog } from '../../interfaces';

type ResponseData = {
  message: string
  body: string | undefined
}

let getDailyTaskLogs = async function(username: string) {
  const result = await sql`
  SELECT id, taskid, title, description, day, done, username 
  FROM dailylog 
  WHERE username = ${username};`;
  const logs = result.rows as DailyLog[];
  return logs;
};

export async function GET(
  req: NextRequest
) {
    console.log('request from logs get', req);
    //let parsedRequest = await req.json();
    let username = 'edaitch'; //TODO get from auth/users table
    console.log('get username', username);
    let logs = await getDailyTaskLogs(username);
    console.log('logs from GET', logs);
    return Response.json({logs});
}
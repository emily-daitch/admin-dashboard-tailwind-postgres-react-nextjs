import { sql } from '@vercel/postgres';
import { Title, Text } from '@tremor/react';

interface DailyLog {
  id: number;
  description: string;
  username: string;
  taskid: string;
}

interface DailyTask {
    id: string;
    description: string;
    username: string;
    taskorder: number;
  }

export default async function DailyPage() {
  const logResult = await sql`
    SELECT id, taskid, done, username
    FROM dailylog 
    WHERE username ILIKE  'edaitch'
    AND   day      =      now()::date
    ORDER BY id DESC;
  `;
  const dailyLogs = logResult.rows as DailyLog[];

  const taskResult = await sql`
    SELECT id, username, taskorder, description
    FROM dailytask
    WHERE username ILIKE  'edaitch'
    ORDER BY taskorder ASC;
  `;
  const dailyTasks = taskResult.rows as DailyTask[];

  let dailyTaskNumber = 1;
  let lastDoneTaskId = '';
  console.log('dailylogs', dailyLogs);
  if(dailyLogs.length == 0) {
    console.log('daily logs empty');
  } else {
    lastDoneTaskId = dailyLogs[dailyLogs.length - 1].taskid;
  }

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Daily</Title>
      <Text>Daily task prompts, ordered.</Text>
      {dailyLogs.length != 0 ? dailyTasks[dailyTasks.findIndex((task) => task.id = lastDoneTaskId)].description
                 : dailyTasks[dailyTasks.findIndex((task) => task.taskorder = dailyTaskNumber)].description}
    </main>
  );
}
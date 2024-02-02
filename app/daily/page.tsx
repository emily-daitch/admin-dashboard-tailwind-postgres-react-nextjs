import { sql } from '@vercel/postgres';
import { Title, Text } from '@tremor/react';

interface DailyLog {
  id: number;
  description: string;
  lastVisit: Date;
  nextVisit: Date;
}

export default async function DailyPage() {
  const result = await sql`
    SELECT id, taskid, done
    FROM dailylog 
    WHERE username ILIKE  'edaitch'
    AND   day      =      now()::date;
  `;
  const dailyLogs = result.rows as DailyLog[];

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Daily</Title>
      <Text>Daily task prompts, ordered.</Text>
      {dailyLogs[0]?.description}
    </main>
  );
}
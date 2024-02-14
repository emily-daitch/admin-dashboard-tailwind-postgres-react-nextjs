import { Title, Text } from '@tremor/react';
import styles from './styles.module.css';
import { unstable_noStore as noStore } from 'next/cache';
import { LogGroup } from '../interfaces';

export default async function DailyPage({} : {}) {
noStore();
const getTaskLogs = async () => {
  
  let url = 'https://admin-dashboard-tailwind-postgres-react-nextjs-ruby-eta.vercel.app/api/dailyLogs?';

      return new Promise<LogGroup>(async (resolve, reject) => {
        const logsResponse = await fetch(url);
        const logs = await logsResponse.json();
        console.log('logs from daily page', logs);
        if(!logs) {
          reject(new Error("Error getting users."));
        } else {
          resolve({ ...logs})
        }
      })
};

const logsTest = await getTaskLogs() as LogGroup;
console.log('awaited logsTest from daily page', logsTest);
  return (
    <main className={styles.daily}>
      <Title>Daily</Title>
      <Text>Daily task prompts, ordered.</Text>
      <Text>Placeholder.</Text>
      <Text>Number of logs: {logsTest.logs.length}</Text>
    </main>
  );
}
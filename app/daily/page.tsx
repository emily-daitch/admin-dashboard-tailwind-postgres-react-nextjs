'use client';

import { Title, Text } from '@tremor/react';
import styles from './styles.module.css';
import { unstable_noStore as noStore } from 'next/cache';
import { LogGroup, TaskGroup } from '../interfaces';
import { Button } from '@mui/material';
import { UpdateDisabledOutlined } from '@mui/icons-material';

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

let logsTest = await getTaskLogs() as LogGroup;

const getTasks = async (search: string) => {
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
  
  let url = 'https://admin-dashboard-tailwind-postgres-react-nextjs-ruby-eta.vercel.app/api/daily?' + query;
  console.log('URL', url);

      return new Promise<TaskGroup>(async (resolve, reject) => {
        const usersResponse = await fetch(url);
        const users = await usersResponse.json();
        console.log('users from admin page', users);
        if(!users) {
          reject(new Error("Error getting users."));
        } else {
          resolve({ ...users})
        }
      })
};
let tasksTest = await getTasks('') as TaskGroup;

console.log('awaited logsTest from daily page', logsTest);
  return (
    <main className={styles.daily}>
      <Title>Daily</Title>
      <Text>Daily task prompts, ordered.</Text>
      <Text>Placeholder.</Text>
      <Text>Number of logs: {logsTest.logs.length}</Text>
      <Text>Next Task: {tasksTest.tasks[logsTest.logs.length].title}</Text>
      {logsTest.logs.length == tasksTest.tasks.length ? <Text>Tasks complete! :&#41;</Text> : <Button
      onClick={async () => {
        const dailyLogsResponse = await fetch('https://admin-dashboard-tailwind-postgres-react-nextjs-ruby-eta.vercel.app/api/dailyLogs', {
          method: 'POST',
          body: JSON.stringify({
            title: tasksTest.tasks[logsTest.logs.length].title,
            done: true,
            username: tasksTest.tasks[logsTest.logs.length].username,
            description: tasksTest.tasks[logsTest.logs.length].description,
            taskid: tasksTest.tasks[logsTest.logs.length].id
          })
        });
        logsTest = await getTaskLogs() as LogGroup;
      }}>Complete Task</Button>}
    </main>
  );
}
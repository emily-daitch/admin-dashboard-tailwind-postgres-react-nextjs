'use client';
import { Title, Text, Card } from '@tremor/react';
import { LogGroup, TaskGroup } from '../interfaces';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react'
// TODO useEffect

const getTaskLogs = async () => {
  
    let url = 'https://admin-dashboard-tailwind-postgres-react-nextjs-ruby-eta.vercel.app/api/dailyLogs?';
  
        return new Promise<LogGroup>(async (resolve, reject) => {
          const logsResponse = await fetch(url, { cache: 'no-store' });
          const logs = await logsResponse.json();
          console.log('logs from daily page', logs);
          if(!logs) {
            reject(new Error("Error getting users."));
          } else {
            resolve({ ...logs})
          }
        })
  };

export default async function TaskFinisher({tasksTest} : {tasksTest: TaskGroup}) {
    const [logsTest, setLogsTest] = useState<LogGroup | null>(null)
    const [isLoading, setLoading] = useState(true)
    let url = 'https://admin-dashboard-tailwind-postgres-react-nextjs-ruby-eta.vercel.app/api/dailyLogs?';

    useEffect(() => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setLogsTest(data)
          setLoading(false)
        })
    }, [])
   
    if (isLoading) return <p>Loading...</p>
    if (!logsTest) return <p>No log data</p>
    return (
      <Card className="mt-8">
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
        console.log('dailyLogsResponse', dailyLogsResponse);
        const dailyLogsNew = await getTaskLogs();
        setLogsTest(dailyLogsNew);
      }}>Complete Task</Button>}
      </Card>
    );
  }
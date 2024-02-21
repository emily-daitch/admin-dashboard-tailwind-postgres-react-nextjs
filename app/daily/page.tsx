import { Title, Text } from '@tremor/react';
import styles from './styles.module.css';

import { LogGroup, TaskGroup } from '../interfaces';
import TaskFinisher from './taskFinisher';

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
          const usersResponse = await fetch(url, { cache: 'no-store' });
          const users = await usersResponse.json();
          console.log('users from admin page', users);
          if(!users) {
            reject(new Error("Error getting users."));
          } else {
            resolve({ ...users})
          }
        })
  };

export default async function DailyPage() {
  let tasksTest = await getTasks('') as TaskGroup;

  // as an example, these logs happen at build time. this is a static page
  console.log('tasksTest', tasksTest);

  return (
    <main className={styles.daily}>
      <Title>Daily</Title>
      <Text>Daily task prompts, ordered.</Text>
      <Text>Placeholder.</Text>
      <TaskFinisher tasksTest={tasksTest}></TaskFinisher>
    </main>
  );
}
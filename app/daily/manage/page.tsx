import { Title, Text } from '@tremor/react';
import BasicEditingGrid from '../../taskEditGrid';
import { unstable_noStore as noStore } from 'next/cache';
import { TaskGroup } from '../../interfaces';

export default async function ManageDaily({
  searchParams
} : {
  searchParams: { q: string };
}) {

  noStore();
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
  console.log('searchParams', searchParams);
  const search = searchParams.q ?? '';

  const tasksTest = await getTasks(search) as TaskGroup;
  console.log('awaited usersTest(api) from admin page', tasksTest);

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Daily Tasks</Title>
      <Text>Manage Daily Tasks</Text>
      <BasicEditingGrid rowsProp={tasksTest.tasks}></BasicEditingGrid>
    </main>
  );
}
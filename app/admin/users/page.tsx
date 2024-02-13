import * as React from 'react';
import { Title, Text } from '@tremor/react';
import Search from '../../search';
import BasicEditingGrid from '../../editGrid';
import {
  GridRowId,
} from '@mui/x-data-grid';
import { unstable_noStore as noStore } from 'next/cache';
import { User, UserGroup } from '../../interfaces';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  noStore();
  const getUsers = async (search: string) => {
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
    
    let url = 'https://admin-dashboard-tailwind-postgres-react-nextjs-ruby-eta.vercel.app/api/users?' + query;
    console.log('URL', url);

        return new Promise<UserGroup>(async (resolve, reject) => {
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

  const usersTest = await getUsers(search) as UserGroup;
  console.log('awaited usersTest(api) from admin page', usersTest);
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Manage Users</Title>
      <Text>CRUD interface for users</Text>
      <Search />
      <BasicEditingGrid rowsProp={usersTest.users}></BasicEditingGrid>
    </main>
  );
}
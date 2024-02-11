import * as React from 'react';
import { sql } from '@vercel/postgres';
import { Title, Text } from '@tremor/react';
import Search from '../../search';
import BasicEditingGrid from '../../editGrid';
import {
  GridRowId,
} from '@mui/x-data-grid';

interface Appointment {
  id: number;
  description: string;
  lastVisit: Date;
  nextVisit: Date;
}

interface User {
  name: string;
  email: string;
  id: GridRowId;
  username: string;
}

interface UserGroup {
  users: User[]
}

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {

  const getUsers = async (search: string) => {
    let params: {[key: string]: string} = { // define params as an indexable type
      "search": search,
    };
    
    let query = Object.keys(params)
                 .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                 .join('&');
    
    let url = 'https://admin-dashboard-tailwind-postgres-react-nextjs-ruby-eta.vercel.app/api/users?' + query;

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

  ///
  const search = searchParams.q ?? '';
  // const resultUsers = searchParams.q ? await sql`
  // SELECT id, name, username, email 
  // FROM users 
  // WHERE name ILIKE ${'%' + search + '%'};
  // ` : await sql`
  // SELECT *  
  // FROM users;
  // `;
  // const users = resultUsers.rows as User[];
  ///

  const usersTest = await getUsers(search) as UserGroup;
  console.log('awaited usersTest(api) from admin page', usersTest);
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Manage Users</Title>
      <Text>CRUD interface for users</Text>
      <Search />
      {/* <Card className="mt-6">
        <AppointmentTable appointments={appointments} />
      </Card> */}
      <BasicEditingGrid users={usersTest.users}></BasicEditingGrid>
    </main>
  );
}
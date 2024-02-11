import { sql } from '@vercel/postgres';
import { NextRequest } from 'next/server'

type ResponseData = {
  message: string
  body: string | undefined
}

interface User {
  name: string;
  email: string;
  id: number | string;
  username: string;
}
 
let updateUser = async function(user: Partial<User>) {
  const result = await sql`UPDATE users SET name = ${user.name},
  username = ${user.username} 
  WHERE email = ${user.email}`;
  const users = result.rows as User[];
  return users;
};

let getUsers = async function(search: string) {
  const result = search === '' ? await sql`SELECT * FROM users` : await sql`
  SELECT id, name, username, email 
  FROM users 
  WHERE name ILIKE ${'%' + search + '%'};`;
  const users = result.rows as User[];
  return users;
};

export async function POST(
  req: Request
) {
    if(req.body) {
      let parsedBody = await req.json();
      console.log('post user', parsedBody);
      let updatedUser = await updateUser(parsedBody);
      return Response.json({user: updatedUser});
    }
}

export async function GET(
  req: NextRequest
) {
    console.log('request from users get', req);
    //let parsedRequest = await req.json();
    let search = req.nextUrl.searchParams.get('search') || '';
    console.log('get search', search);
    let users = await getUsers(search);
    console.log('users from GET', users);
    return Response.json({users});
}
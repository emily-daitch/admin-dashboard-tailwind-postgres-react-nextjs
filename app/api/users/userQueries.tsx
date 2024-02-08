import type { NextApiRequest, NextApiResponse } from 'next'
import { sql } from '@vercel/postgres';

type ResponseData = {
  message: string
}

interface User {
  name: string;
  email: string;
  id: number | string;
  username: string;
}
 
let updateUser = async function(user: Partial<User>) {
  const result = await sql`UPDATE users SET name = ${user.name} 
  username = ${user.username} 
  WHERE email = ${user.email};`;
  const users = result.rows as User[];
  return users;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if(req.method === "POST") {
    if(req.body) {
      const user = JSON.parse(req.body);
      console.log('post user', user);
      updateUser(user);
    }
  } else {
    console.log('unsupported method from userQueries');
  }
  res.status(200).json({ message: 'Hello from Next.js!' })
}
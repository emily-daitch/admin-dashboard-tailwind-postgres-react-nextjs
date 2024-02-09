import { sql } from '@vercel/postgres';

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

export async function POST(
  req: Request
) {
    if(req.body) {
      let parsedBody = await req.json();
      console.log('post user', parsedBody);
      let updatedUser = await updateUser(parsedBody);
      return Response.json({user: updateUser});
    }
}
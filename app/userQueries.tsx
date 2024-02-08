import { sql } from '@vercel/postgres';

interface User {
    name: string;
    email: string;
    id: number | string;
    username: string;
  }

let updateUser = async function(user: User) {
    const result = await sql`UPDATE users SET name = ${user.name} 
    username = ${user.username} 
    WHERE email = ${user.email};`;
    const users = result.rows as User[];
    return users;
};

export { updateUser };
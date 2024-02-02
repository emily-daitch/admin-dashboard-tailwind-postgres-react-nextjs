import Navbar from './navbar';
import { auth } from './auth';

export default async function Nav() {
  const session = await auth();
  console.log('session', session);
  return <Navbar user={session?.user} />;
}

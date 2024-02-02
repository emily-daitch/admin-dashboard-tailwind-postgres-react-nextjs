import Navbar from './navbar';
import { auth } from './auth';

export default async function Nav() {
  const session = await auth();
  console.log('session', session);
  if(session) {
    // check db for user by email, if user DNE prompt for username,
    // if user provides username (will need some validation - length, characters, unique)
    // then add user with username to DB
    // else, sign out user. User will have to continue as guest seeing only test data

    // maybe we need a component outside of nav that does this
    // keeps nav clean, maybe can avoid putting on every page by putting this in layout
    // but will need to get session in layout
  }
  return <Navbar user={session?.user} />;
}

import { Title, Text } from '@tremor/react';
import styles from './styles.module.css';

export default async function DailyPage({
  searchParams
} : {
  searchParams: { q: string };
}) {
//    <main className="p-4 md:p-10 mx-auto max-w-7xl">

  return (
    <main className={styles.daily}>
      <Title>Daily</Title>
      <Text>Daily task prompts, ordered.</Text>
      <Text>Placeholder.</Text>
    </main>
  );
}
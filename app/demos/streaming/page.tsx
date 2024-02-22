import { Title, } from '@tremor/react';

export default async function StreamingDemo() {
  await fetch('https://admin-dashboard-tailwind-postgres-react-nextjs-ruby-eta.vercel.app/api/handle-backpressure');
  await fetch('https://admin-dashboard-tailwind-postgres-react-nextjs-ruby-eta.vercel.app/api/chunk-example');
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Streaming Demo</Title>
    </main>
  );
}

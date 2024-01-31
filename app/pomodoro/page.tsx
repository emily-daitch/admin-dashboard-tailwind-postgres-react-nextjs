'use client';

import { Card, Title, Text, Button} from '@tremor/react';

export default function PlaygroundPage() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Pomodoro</Title>
      <Card>
        <Text>25:00</Text>
        <Button>Begin</Button>
      </Card>
    </main>
  );
}

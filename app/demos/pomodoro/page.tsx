'use client';

import { Card, Title, Text, Button} from '@tremor/react';
import Timer from '../../timer';

export default function Pomodoro() {

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Pomodoro</Title>
      <Card>
        <Timer />
      </Card>
    </main>
  );
}

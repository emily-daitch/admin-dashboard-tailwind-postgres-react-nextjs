import { Title, } from '@tremor/react';

export default function DemosDirectory() {

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Demos</Title>
      <a href='/demos/pomodoro'>Pomodoro Timer</a><br></br>
      <a href='/demos/webSocket'>Websocket Demo</a>
    </main>
  );
}

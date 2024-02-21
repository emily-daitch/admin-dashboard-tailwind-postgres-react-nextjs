import { Title, } from '@tremor/react';

export default function PlaygroundPage() {

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Directory</Title>
      <a href='/daily'>Daily Log</a><br></br>
      <a href='/appointments'>Appointments</a><br></br>

      <Title>Tools</Title>
      <a href='/setupDaily'>Manage Daily Log</a><br></br>

      <Title>Tools</Title>
      <a href='/pomodoro'>Pomodoro Timer</a>
    </main>
  );
}

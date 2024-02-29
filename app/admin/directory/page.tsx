import { Title, } from '@tremor/react';

export default function AdminDirectory() {

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Admin Directory</Title>
      <a href='/daily'>Daily Log</a><br></br>
      <a href='/appointments'>Appointments</a><br></br>

      <Title>Tools</Title>
      <a href='/daily/manage'>Manage Daily Log</a><br></br>
      <a href='/appointments/manage'>Manage Appointments</a><br></br>

      <Title>Admin Tools</Title>
      <a href='/admin/manage/users'>Manage Users</a><br></br>
      <a href='/admin/users'>Users List</a><br></br>
      <a href='/directory'>Standard Directory</a><br></br>

      <Title>Demos</Title>
      <a href='/demos/pomodoro'>Pomodoro Timer</a><br></br>
      <a href='/demos/streaming'>Streaming Demo</a>
    </main>
  );
}

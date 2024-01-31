import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';

interface Appointment {
  id: number;
  description: string;
  lastVisit: Date;
  nextVisit: Date;
}

export default function AppointmentTable({ appointments }: { appointments: Appointment[] }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Description</TableHeaderCell>
          <TableHeaderCell>Last Visit</TableHeaderCell>
          <TableHeaderCell>Next Scheduled Visit</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {appointments.map((appointment) => (
          <TableRow key={appointment.id}>
            <TableCell>{appointment.description}</TableCell>
            <TableCell>
              <Text>{appointment.lastVisit.toDateString()}</Text>
            </TableCell>
            <TableCell>
              <Text>{appointment.nextVisit.toDateString()}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

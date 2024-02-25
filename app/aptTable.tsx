import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';
import { Appointment } from './interfaces';

export default function AppointmentTable({ appointments }: { appointments: Appointment[] }) {
  console.log('appointments', appointments);
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
              <Text>{appointment.lastVisit}</Text>
            </TableCell>
            <TableCell>
              <Text>{appointment.nextVisit}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

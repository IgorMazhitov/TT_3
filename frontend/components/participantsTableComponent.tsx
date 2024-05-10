import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { IParticipant } from "../src/app/interfaces/participant.interface";

interface ParticipantsTableProps {
  participants: IParticipant[];
}

export default function ParticipantsTable({
  participants,
}: ParticipantsTableProps) {
  if (!participants) {
    return <div>Loading...</div>;
  }
  return (
    <Table aria-label="Example static collection table" className=" w-1/2 h-1/2">
      <TableHeader>
        <TableColumn>Name</TableColumn>
        <TableColumn>Family Name</TableColumn>
        <TableColumn>Participation</TableColumn>
      </TableHeader>
      <TableBody>
        {participants.map((participant) => (
          <TableRow key={participant.id}>
            <TableCell>{participant.name}</TableCell>
            <TableCell>{participant.familyName}</TableCell>
            <TableCell>{participant.participation}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

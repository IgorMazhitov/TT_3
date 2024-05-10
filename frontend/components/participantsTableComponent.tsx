import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { IParticipant } from "../src/app/interfaces/participant.interface";
import axios from "axios";

interface ParticipantsTableProps {
  participants: IParticipant[];
  onDelete: () => void;
}

export default function ParticipantsTable({
  participants,
  onDelete
}: ParticipantsTableProps) {
  if (!participants) {
    return <div>Loading...</div>;
  }
  const deleteUser = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:3300/participation/delete/${id}`
      );
      onDelete();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Table
      aria-label="Example static collection table"
      className=" w-1/2 h-1/2"
    >
      <TableHeader>
        <TableColumn>Name</TableColumn>
        <TableColumn>Family Name</TableColumn>
        <TableColumn>Participation</TableColumn>
        <TableColumn>Actions</TableColumn>
      </TableHeader>
      <TableBody>
        {participants.map((participant) => (
          <TableRow key={participant.id}>
            <TableCell>{participant.name}</TableCell>
            <TableCell>{participant.familyName}</TableCell>
            <TableCell>{participant.participation}</TableCell>
            <TableCell className="relative flex items-center gap-2">
              <Tooltip color="danger" content="Delete user">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <Button onClick={() => deleteUser(participant.id)}>Delete</Button>
                </span>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

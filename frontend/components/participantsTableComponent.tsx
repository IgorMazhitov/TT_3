import {
  Button,
  Dropdown,
  Pagination,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { IParticipant } from "../src/app/interfaces/participants/participant.interface";
import { deleteParticipant } from "@/api/participationApi/participationApi";
import { useState } from "react";
import React from "react";

interface ParticipantsTableProps {
  participants: IParticipant[];
  onDelete: () => void;
}

export default function ParticipantsTable({
  participants,
  onDelete,
}: ParticipantsTableProps) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const limitOptions = [5, 10, 20, 30];
  const [pages, setPages] = useState(Math.ceil(participants.length / limit));
  if (!participants) {
    return <div>Loading...</div>;
  }

  const items = React.useMemo(() => {
    const start = (page - 1) * limit;
    const end = start + limit;
    return participants.slice(start, end);
  }, [participants, page, limit]);

  const deleteUser = async (id: number) => {
    try {
      await deleteParticipant(id);
      onDelete();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Table
      topContent={
        <Select
          label="Rows per page"
          value={limit}
          onChange={(event) => {
            setLimit(parseInt(event.target.value));
            setPages(
              Math.ceil(participants.length / parseInt(event.target.value))
            );
          }}
        >
          {limitOptions.map((limit) => (
            <SelectItem key={limit} value={limit}>
              {limit}
            </SelectItem>
          ))}
        </Select>
      }
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      aria-label="Example static collection table"
      className=" w-1/2 h-1/2"
    >
      <TableHeader>
        <TableColumn>Name</TableColumn>
        <TableColumn>Family Name</TableColumn>
        <TableColumn>Participation</TableColumn>
        <TableColumn>Actions</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No rows to display."}>
        {items.map((participant) => (
          <TableRow key={participant.id}>
            <TableCell>{participant.name}</TableCell>
            <TableCell>{participant.familyName}</TableCell>
            <TableCell>{participant.participation} %</TableCell>
            <TableCell className="relative flex items-center gap-2">
              <Tooltip color="danger" content="Delete user">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <Button onClick={() => deleteUser(participant.id)}>
                    Delete
                  </Button>
                </span>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

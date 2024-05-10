import { useState } from "react";
import { INewParticipant } from "../src/app/interfaces/participant.interface";
import { Button, Input } from "@nextui-org/react";

interface CreateParticipantProps {
  addNew: (participant: INewParticipant) => void;
}

export default function CreateParticipant({ addNew }: CreateParticipantProps) {
  const [name, setName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [participation, setParticipation] = useState(0);
  const handleClick = () => {
    addNew({ name, familyName, participation });
  };
  return (
    <div className="flex flex-row justify-center items-center gap-2 p-3">
      <Input
        size="sm"
        onChange={(e) => setName(e.target.value)}
        value={name}
        type="text"
        label="User name"
      />
      <Input
        size="sm"
        onChange={(e) => setFamilyName(e.target.value)}
        value={familyName}
        type="text"
        label="User Family Name"
      />
      <Input
        size="sm"
        onChange={(e) => setParticipation(parseInt(e.target.value))}
        value={participation.toString()}
        type="number"
        label="User Partition Number"
      />
      <Button onClick={() => handleClick()}> Create </Button>
    </div>
  );
}

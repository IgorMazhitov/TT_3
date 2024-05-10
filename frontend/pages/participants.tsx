import ParticipantsTable from "../components/participantsTableComponent";
import {
  INewParticipant,
  IParticipant,
} from "../src/app/interfaces/participant.interface";
import { useState } from "react";
import axios from "axios";
import ParticipationPieChart from "../components/participantsChartPieComponent";
import CreateParticipant from "../components/createParticipantComponent";
import "../src/app/globals.css";
import { addParticipant, getParticipants } from "@/api/participationApi/participationApi";

interface IParticipationProps {
  participants: IParticipant[];
}

export default function Participation({ participants }: IParticipationProps) {
  const [reactParticipants, setReactParticipants] =
    useState<IParticipant[]>(participants);
  const onAddParticipant = async (participant: INewParticipant) => {
    try {
      await addParticipant(participant);
      await fetchParticipants();
    } catch (error) {
      console.log(error);
    }
  };
  const fetchParticipants = async () => {
    try {
      const participants = await getParticipants();
      setReactParticipants(participants);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <CreateParticipant addNew={onAddParticipant} />
      <div className="flex flex-row gap-10 p-3 justify-center items-start">
        <ParticipantsTable onDelete={fetchParticipants} participants={reactParticipants} />
        <ParticipationPieChart participants={reactParticipants} />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const res = await axios.get("http://backend:3300/participation");
  const participants: IParticipant[] = res.data;

  return {
    props: {
      participants,
    },
  };
}

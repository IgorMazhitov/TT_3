import ParticipantsTable from "../components/participantsTableComponent";
import {
  IParticipant,
} from "../src/app/interfaces/participants/participant.interface";
import { useState } from "react";
import axios from "axios";
import ParticipationPieChart from "../components/participantsChartPieComponent";
import CreateParticipant from "../components/createParticipantComponent";
import "../src/app/globals.css";
import { addParticipant, getParticipants } from "@/api/participationApi/participationApi";
import { CreateNewParticipantDto } from "@/app/interfaces/participants/participantsApi.interface";

interface IParticipationProps {
  participants: IParticipant[];
}

export default function Participation({ participants }: IParticipationProps) {
  const [reactParticipants, setReactParticipants] =
    useState<IParticipant[]>(participants);
  const onAddParticipant = async (participant: CreateNewParticipantDto) => {
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
    <div className="flex flex-col w-screen gap-3 flex-wrap justify-center content-center items-start">
      <CreateParticipant addNew={onAddParticipant} />
      <div className="flex w-full flex-col md:flex-row gap-10 p-3 justify-center items-start">
        <ParticipantsTable onDelete={fetchParticipants} participants={reactParticipants} />
        <ParticipationPieChart participants={reactParticipants} />
      </div>
    </div>
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

import { CreateNewParticipantDto } from "@/app/interfaces/participants/participant.interface";
import { apiURL } from "../commonApi/api";
import axios from "axios";

export const getParticipants = async () => {
  try {
    const response = await axios.get(`${apiURL}/participation`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addParticipant = async (participant: CreateNewParticipantDto) => {
  try {
    const response = await axios.post(
      `${apiURL}/participation/add`,
      participant
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteParticipant = async (id: number) => {
  try {
    const response = await axios.delete(`${apiURL}/participation/delete/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

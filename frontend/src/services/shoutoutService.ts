import axios from "axios";
import Shoutout from "../models/Shoutout";

const baseURL: string = process.env.REACT_APP_API_URL || "";

export const fetchShoutouts = async (): Promise<Shoutout[]> => {
  return (await axios.get(baseURL)).data;
};

export const addShoutout = async (shoutout: Shoutout): Promise<Shoutout> => {
  return (await axios.post(baseURL, shoutout)).data;
};

export const getShoutoutsByName = async (name: string): Promise<Shoutout[]> => {
  return (await axios.get(`${baseURL}/user/${encodeURIComponent(name)}`)).data;
};

export const deleteById = async (id: string): Promise<void> => {
  return (await axios.delete(`${baseURL}/user/${encodeURIComponent(id)}`)).data;
};

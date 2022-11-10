import axios from "axios";

export const loadEventsApi = async () =>
  await axios.post(`http://localhost:5010/events`);

export const loadMoreEventsApi = async (ids: string[]) =>
  await axios.post(`http://localhost:5010/resources`, {ids});
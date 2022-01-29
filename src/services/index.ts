import { TAirportInfo, TAirports } from "./types";

const BASE_URL = "http://localhost:1234";

export const retrieveAirports = async (query: String): Promise<TAirports> => {
  const res = await fetch(`${BASE_URL}/airports?search=${query}`);
  return res.ok && res.json();
};

export const retrieveAirportInfoByCode = async (
  airportCode: String
): Promise<TAirportInfo> => {
  const res = await fetch(`${BASE_URL}/airports/${airportCode}`);
  return res.ok
    ? res.json()
    : {
        heading: "Airport info not found",
        description: "Please try again",
      };
};

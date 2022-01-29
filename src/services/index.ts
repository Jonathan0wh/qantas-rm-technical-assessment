const BASE_URL = "http://localhost:1234";

// {
//   "city": "Sydney (Bankstown)",
//   "country": "Australia",
//   "countryCode": "AU",
//   "airportCode": "BWU"
// }
export const retrieveAirports = (query: String): any => {
  return fetch(`${BASE_URL}/airports?search=${query}`).then(
    res => res.ok && res.json()
  );
}

// {
//   "heading": "Sydney",
//   "description": "Sydney airport decription"
// }
export const retrieveAirportInfoByCode = (airportCode: String): any => {
  return fetch(`${BASE_URL}/airports/${airportCode}`).then(res =>
    res.ok
      ? res.json()
      : {
          heading: "Airport info not found",
          description: "Please try again"
        }
  );
}

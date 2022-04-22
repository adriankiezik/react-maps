import config from "../../config.json";

const fetchLocation = async (locationName) => {
  const url = config.BACKEND_URL + "/find?search=" + encodeURI(locationName);
  const result = await fetch(url);
  const data = await result.json();

  return data;
};

export default fetchLocation;

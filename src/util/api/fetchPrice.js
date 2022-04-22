import config from "../../config.json";

const fetchPrice = async (pricePerKm, totalDistance) => {
  try {
    const url =
      config.BACKEND_URL +
      "/costs?priceperkm=" +
      encodeURI(pricePerKm) +
      "&distance=" +
      encodeURI((totalDistance / 1000).toFixed(2));
    const result = await fetch(url);
    var data = await result.json();
  } catch (err) {
    console.error(err);
    alert("Couldn't fetch price. Is backend server down?");
  }

  return data.totalPrice;
};

export default fetchPrice;

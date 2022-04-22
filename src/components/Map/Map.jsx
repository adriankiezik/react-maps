import React, { useState, useEffect } from "react";
import styles from "./map.module.scss";
import { useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer } from "react-leaflet";
import fetchLocation from "../../util/api/fetchLocation";
import RoutingMachine from "./RoutingMachine";
import DownloadPdf from "../../util/DownloadPdf";
import addToHistory from "../../util/history/addToHistory";
import PriceInput from "../Price/Input/PriceInput";
import PriceResult from "../Price/Result/PriceResult";
import fetchPrice from "../../util/api/fetchPrice";

const Map = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [kmPrice, setKmPrice] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);

  const [routeNavInfo, setRouteNavInfo] = useState(null);
  const [routeInfo, setRouteInfo] = useState({
    startPosition: null,
    endPosition: null,
  });

  useEffect(() => {
    if (kmPrice == null || routeNavInfo == null || isNaN(kmPrice)) return;
    getTotalPrice(kmPrice, routeNavInfo.distance);
  }, [kmPrice, routeNavInfo]);

  useEffect(() => {
    const start = searchParams.get("start");
    const end = searchParams.get("end");

    if (start == null || end == null) {
      alert("Brak niezbędnych informacji o trasie. Spróbuj ponownie.");
      return;
    }

    fetchPositions(start, end);
  }, []);

  useEffect(() => {
    addToHistory(routeInfo);
  }, [routeInfo]);

  const fetchPositions = async (start, end) => {
    let startResponse;
    let endResponse;
    try {
      startResponse = await fetchLocation(start);
      endResponse = await fetchLocation(end);
    } catch (err) {
      alert("Nie znaleziono takich miejsc. Spróbuj ponownie.");
      console.error(err);
      return;
    }
    if (startResponse == null || endResponse == null) {
      alert("Nie znaleziono takich miejsc. Spróbuj ponownie.");
      return;
    }
    setRouteInfo({
      startPosition: [
        startResponse.name,
        +startResponse.lat,
        +startResponse.lon,
      ],
      endPosition: [endResponse.name, +endResponse.lat, +endResponse.lon],
    });
  };

  const getTotalPrice = async (pricePerKm, totalDistance) => {
    const result = await fetchPrice(pricePerKm, totalDistance);
    if (result == null || isNaN(result)) {
      alert("Couldn't fetch total price from server. Try again.");
      return;
    }
    setTotalPrice(result);
  };

  return (
    <div>
      <MapContainer
        doubleClickZoom={false}
        zoom={14}
        center={[33.5024, 36.2988]}
        style={{
          height: "90vh",
          width: "98%",
          marginRight: "1%",
          marginLeft: "1%",
        }}
      >
        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {routeInfo.startPosition == null ||
        routeInfo.endPosition == null ? null : (
          <RoutingMachine positions={routeInfo} setInfo={setRouteNavInfo} />
        )}
        <PriceInput setKmPrice={setKmPrice} />
        {totalPrice == null || isNaN(totalPrice) ? null : (
          <PriceResult price={totalPrice} />
        )}
      </MapContainer>
      <div
        onClick={() => DownloadPdf(routeNavInfo)}
        className={styles["map__pdf"]}
      >
        Pobierz PDF
      </div>
    </div>
  );
};

export default Map;

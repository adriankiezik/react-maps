import React, { useState, useEffect } from "react";
import styles from "./map.module.scss";
import { useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer } from "react-leaflet";
import fetchLocation from "../../util/api/fetchLocation";
import RoutingMachine from "./RoutingMachine";
import DownloadPdf from "./DownloadPdf";
import addToHistory from "../../util/history/addToHistory";

const Map = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [routeNavInfo, setRouteNavInfo] = useState(null);

  const [routeInfo, setRouteInfo] = useState({
    startPosition: null,
    endPosition: null,
    price: null,
  });

  useEffect(() => {
    const start = searchParams.get("start");
    const end = searchParams.get("end");
    const price = searchParams.get("price");

    if (start == null || end == null || price == null) {
      alert("Brak niezbędnych informacji o trasie. Spróbuj ponownie.");
      return;
    }

    fetchPositions(start, end, price);
  }, []);

  useEffect(() => {
    addToHistory(routeInfo);
  }, [routeInfo]);

  const fetchPositions = async (start, end, price) => {
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
      price: +price,
    });
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
